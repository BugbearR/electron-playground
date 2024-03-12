/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

console.log(`navigator.language: ${navigator.language}`);
console.log(`navigator.languages: ${JSON.stringify(navigator.languages)}`);

/**
 * Count the number of matching items in language tags.
 * @param {string} lang1 The first language.
 * @param {string} lang2 The second language.
 * @returns {number} The number of matching items.
 */
function countMatchLanguageTagItem(lang1, lang2) {
    const lang1Array = lang1.toLowerCase().replaceAll("_", "-").split("-");
    const lang2Array = lang2.toLowerCase().replaceAll("_", "-").split("-");

    // If at least the first block does not match, it's a mismatch
    if (lang1Array[0] !== lang2Array[0]) {
        return 0;
    }

    let matchCount = 1;
    let i = 1;
    let j = 1;
    // Search for elements that match both and count them. The number of gaps does not necessarily match.
    // If it's gg-bb-cc-dd-ee-aa and gg-cc-ee-ff-aa, 4 will match.
    // Assume there is no intersection.
    while ( i < lang1Array.length && j < lang2Array.length ) {
        const ni = lang1Array.indexOf( lang2Array[j], i );
        const nj = lang2Array.indexOf( lang1Array[i], j );
        if ( ni < 0 && nj < 0 ) {
            i++;
            j++;
            continue;
        } else if ( ni < 0 && nj >= 0 ) {
            matchCount++;
            i++;
            j = nj + 1;
        } else if ( ni >= 0 && nj < 0 ) {
            matchCount++;
            i = ni + 1;
            j++;
        }
        if ( ni >= 0 && nj >= 0 ) {
            matchCount++;
            // It seems to be a cross pattern, but adopt the one with the smaller start index.
            if ( i < j ) {
                i++;
                j = nj + 1;
            } else {
                i = ni + 1;
                j++;
            }
        }
    }

    return matchCount;
}

/**
 * Get the best match language from the available languages.
 * @param {string[]} availableLanguages The available languages.
 * @param {string[]} preferredLanguages The preferred languages.
 * @param {string} fallbackLanguage The fallback language.
 * @returns {string} The best match language.
 */
function getBestMatchLanguage( availableLanguages, preferredLanguages, fallbackLanguage ) {
    for ( let i = 0; i < preferredLanguages.length; i++ ) {
        let maxMatchCount = 0;
        let maxMatchIndex = -1;
        for ( let j = 0; j < availableLanguages.length; j++ ) {
            const matchCount = countMatchLanguageTagItem( preferredLanguages[i], availableLanguages[j] );
            if ( matchCount > maxMatchCount ) {
                maxMatchCount = matchCount;
                maxMatchIndex = j;
            }
        }
        if ( maxMatchIndex >= 0 ) {
            return availableLanguages[maxMatchIndex];
        }
    }
    return fallbackLanguage;
}

async function getAvailableLocales() {
    const response = await fetch("/locales/available.json");
    if (response.status !== 200) {
        // 通常あり得ない
        throw new Error("Failed to get available locales");
    }
    const data = await response.json();
    return data.availableLocales;
}

function setLanguageSelector( locale, availableLocales ) {
    const selectElm = document.getElementById("language");
    selectElm.innerHTML = "";
    for (const localeWk of availableLocales) {
        const optionElm = document.createElement("option");
        optionElm.value = localeWk.value;
        optionElm.textContent = localeWk.label;
        if (localeWk.value === locale) {
            optionElm.selected = true;
        }
        selectElm.appendChild(optionElm);
    }
}

function setLabelState() {
    const langLabel = document.getElementById("languageInLanguage");
    langLabel.textContent = i18next.t("language");
}

function setButtonsState() {
    // sample buttons
    const idList = ["yes", "no", "ok", "cancel"];
    for (const id of idList) {
        const buttonElm = document.getElementById(id);
        buttonElm.textContent = i18next.t(id, { namespace: "ns1" });
    }

    const resetLangButtonElm = document.getElementById("resetToDefaultLang");
    resetLangButtonElm.textContent = i18next.t("reset to default language", { namespace: "ns1" });
}

async function init() {
    // console.log("in renderer.js. i18next.t('ns1:key1'):", i18next.t("ns1:key1"));
    // console.log("in renderer.js. i18next.t('ns2:key1'):", i18next.t("ns2:key1"));

    const availableLocales = await getAvailableLocales();
    const availableLangTags = availableLocales.map((localeWk) => {
        return localeWk.value;
    });

    let locale = localStorage.getItem("locale");
    console.log("localStorage locale", locale);
    if (!locale) {
        console.log("not found locale in localStorage");
        console.log("availableLanguages", availableLangTags);

        locale = getBestMatchLanguage(availableLangTags, navigator.languages, availableLocales[0]);
        console.log("getBestMatchLanguage locale:", locale);

        localStorage.setItem("locale", locale);
    }

    await i18next.changeLanguage(locale);

    setLanguageSelector(locale, availableLocales);
    setLabelState();
    setButtonsState();

    document.getElementById("resetToDefaultLang").addEventListener("click", () => {
        localStorage.removeItem("locale");
        location.reload();
    });

    document.getElementById("language").addEventListener("change", async(event) => {
        const newLocale = event.target.value;
        if (!availableLangTags.includes(newLocale)) {
            return;
        }
        console.log("newLocale:", newLocale);
        await i18next.changeLanguage(newLocale);
        localStorage.setItem("locale", newLocale);
        // const curLocale = localStorage.getItem("locale");
        // console.log("curLocale:", curLocale);
        console.log("i18next.t('langTag'):", i18next.t("langTag"));
        setLabelState();
        setButtonsState();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    i18next
        .use(i18nextHttpBackend)
        .init({
            loadPath: "locales/{{lng}}/{{ns}}.json",
            ns: ["ns1", "ns2"],
            fallbackLng: "en"
        }, init);
});
