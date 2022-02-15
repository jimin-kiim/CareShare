import 'dotenv/config';

export default {
  expo: {
    name: "CareShare",
    slug: "CareShare",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.careshare.CareShare",
      googleServicesFile: "./GoogleService-Info.plist",
      config: {
        googleSignIn: {
          reversedClientId: process.env.REVERSED_CLIENT_ID
        }
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      },
      package: "com.careshare.CareShare",
      googleServicesFile: "./google-services.json",
      config: {
        googleSignIn: {
          certificateHash: process.env.CERTIFICATE_HASH
        }
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId:  process.env.MEASUREMENT_ID,
      databaseUrl: process.env.DATABASE_URL,
      replacestorageBucket: process.env.REPLACESTORAGEBUCKET
    }
  }
};
