FROM mcr.microsoft.com/devcontainers/typescript-node

RUN apt-get update -y \
  && DEBIAN_FRONTEND=noninteractive apt-get upgrade -y \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    libnss3 \
    libdbus-1-3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libgtk-3-0 \
    libgbm1 \
    libasound2 \
    fonts-noto-color-emoji \
    fakeroot \
    rpm \
  && apt-get autoremove -y \
  && apt-get clean \
  && rm -rf /var/cache/apt/* /var/lib/apt/lists/
