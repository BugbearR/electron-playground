#!/bin/sh

mkdir -p lib/i18next
curl -L -o lib/i18next/i18next.min.js https://unpkg.com/i18next@23.10.1/dist/umd/i18next.min.js
mkdir -p lib/i18next-http-backend
curl -L -o lib/i18next-http-backend/i18nextHttpBackend.min.js https://unpkg.com/i18next-http-backend@1.3.1/i18nextHttpBackend.min.js
