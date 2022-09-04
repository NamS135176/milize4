#!/bin/bash
yarn install

appcenter codepush release-react -a Milize4-Miruho/Miruho-ios -d Development --mandatory
appcenter codepush release-react -a Milize4-Miruho/Miruho-android -d Development --mandatory