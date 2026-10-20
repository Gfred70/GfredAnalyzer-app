# GfredAnalyzer-app

Appli compagnon de l'analyseur trimix DIY **GfredAnalyzer** (Fred / Gfred70).
Page web installable (Chrome Android), qui marche sans réseau et se connecte
à l'appareil en Bluetooth (Web Bluetooth). Lecture seule, sauf l'onglet Appareil
(heure, luminosité, sensibilité tactile) et le bouton « Où es-tu ? ».

- Adresse : https://gfred70.github.io/GfredAnalyzer-app/
- Démo sans appareil (valeurs inventées) : https://gfred70.github.io/GfredAnalyzer-app/?demo
- Firmware nécessaire : v10.16.0 ou plus récent (v10.17.0 pour l'onglet Appareil et « Où es-tu ? », v10.17.3 pour la température ambiante automatique du Gonflage).

v0.4.0 : onglets Best Mix (grille PPO2 1,4 / 1,6 × END 30 / 40 m, vérification d'un mélange, envoi vers Gonflage)
et Courbes (fichiers CSV de l'export WiFi : o2_hist, press_hist, trend_log ; tendance et fin de vie de la cellule ;
plein écran paysage). Courbes par Bluetooth : à venir.
v0.3.1 : ordre de gonflage par défaut He → O2 → air (choix de Fred, pour vider au maximum la B50 d'He).
v0.3.0 : onglets Prix (prix au litre utilisable, TVAC, location, fond de bouteille) et Gonflage (carte de remplissage
en gaz réel, pression refroidie et à chaud, vidange, sources B50, coût). Compressibilité : tables du Perry's
(comme Subsurface), vérifiées sur les B50 Westfalen ; les constantes Van der Waals du livre de Taymans donnent
7,8 m³ pour une B50 d'He annoncée 9,3 m³ (b de l'He erroné), elles ne sont donc pas utilisées.
v0.2.0 : onglet Appareil (fiche Info, horloge, luminosité, sensibilité tactile) et bouton rouge
« Où es-tu ? » (fait sonner l'appareil et clignoter son écran).
v0.1.1 : onglets sur 2 lignes, ligne jaune sur 2 lignes, identifiant d'appli propre.
v0.1.0 : onglets Direct (miroir de l'écran) et Analyses (MEM). Les autres
onglets (Best Mix, Gonflage, Prix, Courbes, Appareil) viendront ensuite.
