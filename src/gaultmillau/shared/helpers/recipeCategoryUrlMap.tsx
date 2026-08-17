// this function is exported and used in server/index.js to handel the special filtered urls and catch 404
export const mapUrlToRecipeCategoryEnum = (
  recipeCategory = '',
  language = 'de',
): {
  recipeCategoryEnum: string;
  label: string;
  url: string;
  title?: string;
  lead?: string;
} => {
  const isFrenchLanguage = language === 'fr';

  switch (recipeCategory) {
    case '':
      return {
        recipeCategoryEnum: 'all',
        label: isFrenchLanguage ? 'Toutes les recettes' : 'Alle Rezepte',
        url: isFrenchLanguage ? '/fr/recette' : '/rezepte',
      };
    case 'boissons':
      return {
        recipeCategoryEnum: 'Boissons',
        label: 'Boissons',
        url: '/fr/recettes/categorie/boissons',
        title: 'Recettes: Boissons',
        lead: 'C’est l’heure de l’apéro? Les chefs vous révèlent leurs meilleurs cocktails et boissons, avec ou sans alcool, rafraîchissants ou chauds, qui feront de vous un champion de la mixologie.',
      };
    case 'brot':
      return {
        recipeCategoryEnum: 'Brot',
        label: 'Brot',
        url: '/rezepte/kategorie/brot',
        title: 'Rezepte: Brot',
        lead: 'Andreas Caminada, Guy Ravet, Tanja Grandits, Sven Wassmer, Dominik Hartmann: Die Starchefs sind auch Bäcker. Verführerische Rezepte!',
      };
    case 'dessert':
      return {
        recipeCategoryEnum: 'Dessert',
        label: 'Dessert',
        url: '/rezepte/kategorie/dessert',
        title: 'Rezepte: Dessert',
        lead: 'Bei den Desserts geben die Chefs nochmals Vollgas: Die Rezepte für Cheesecake, Apfelkuchen, Strudel, Schoggitörtli, Caramelköpfli, Kaiserschmarrn & Glace.',
      };
    case 'desserts':
      return {
        recipeCategoryEnum: 'Desserts',
        label: 'Desserts',
        url: '/fr/recettes/categorie/desserts',
        title: 'Recettes: Dessert',
        lead: 'Tartes aux fruits, roulés à la cannelle, crèmes brûlées… toutes les astuces pour terminer votre menu en beauté!',
      };
    case 'weihnachtsguetzli':
      return {
        recipeCategoryEnum: 'Weihnachtsguetzli',
        label: 'Weihnachtsguetzli',
        url: '/rezepte/kategorie/weihnachtsguetzli',
        title: 'Rezepte: Weihnachtsguetzli',
        lead: 'Spitzbuben, Mailänderli, Zimtsterne, Vanillekipferl, Kokosmakrönli & Co.: Die GaultMillau-Chefs verraten ihre besten Guetzli-Rezepte.',
      };
    case 'biscuits-de-noel':
      return {
        recipeCategoryEnum: 'Biscuits de Noël',
        label: 'Biscuits de Noël',
        url: '/fr/recettes/categorie/biscuits-de-noel',
        title: 'Recettes: Biscuits de Noël',
        lead: 'Milanais, étoiles à la cannelle, croissants à la vanille, coquins… Les chefs du GaultMillau dévoilent leurs meilleures recettes de biscuits.',
      };
    case 'drinks':
      return {
        recipeCategoryEnum: 'Drinks',
        label: 'Drinks',
        url: '/rezepte/kategorie/drinks',
        title: 'Rezepte: Drinks',
        lead: 'Spass im Glas: Sanddorn-Caipiroska, Mai Thai, Jsotta Spritz, Ingwer Drink & Summer Breeze. Die Starchefs mixen coole Drinks, mit und ohne Alkohol.',
      };
    case 'fisch':
      return {
        recipeCategoryEnum: 'Fisch',
        label: 'Fisch',
        url: '/rezepte/kategorie/fisch',
        title: 'Rezepte: Fisch',
        lead: 'Nur keine Angst! Fisch beim Händler des Vertrauens einkaufen, Rezepte der Starchefs übernehmen: Egli, Saibling, Wolfsbarsch – und frittierte Shrimpsköpfe.',
      };
    case 'fleisch':
      return {
        recipeCategoryEnum: 'Fleisch',
        label: 'Fleisch',
        url: '/rezepte/kategorie/fleisch',
        title: 'Rezepte: Fleisch',
        lead: 'Wagyu oder Wienerschnitzel? Entrecôte oder Hacktätschli? Tatar oder Vitello Tonnato? Die besten Fleisch-Rezepte der GaultMillau-Chefs.',
      };
    case 'pain':
      return {
        recipeCategoryEnum: 'Pain',
        label: 'Pain',
        url: '/fr/recettes/categorie/pain',
        title: 'Recettes: Pain',
        lead: 'Andreas Caminada, Guy Ravet, Tanja Grandits, Sven Wassmer: certains grands chefs sont aussi de grands boulangers. Voici leurs recettes.',
      };
    case 'pasta-und-risotto':
      return {
        recipeCategoryEnum: 'Pasta & Risotto',
        label: 'Pasta & Risotto',
        url: '/rezepte/kategorie/pasta-und-risotto',
        title: 'Rezepte: Pasta & Risotto',
        lead: 'Ravioli, Gnocchi, Pizzoccheri, Spaghetti und Risotto! «Bella Italia» auf dem Teller, dank unkomplizierten Rezepten der Starchefs. Applaus garantiert.',
      };
    case 'pates-et-risotto':
      return {
        recipeCategoryEnum: 'Pates et risotto',
        label: 'Pâtes et risotto',
        url: '/fr/recettes/categorie/pates-et-risotto',
        title: 'Recettes: Pâtes et risotto',
        lead: 'Raviolis, gnocchis, pizzocheri, spaghettis et risotto: les meilleures recettes transalpines réalisées par de grands chefs. Succès garanti!',
      };
    case 'poisson':
      return {
        recipeCategoryEnum: 'Poisson',
        label: 'Poisson',
        url: '/fr/recettes/categorie/poisson',
        title: 'Recettes: Poisson',
        lead: 'Préparer du poisson, c’est facile! Quand on a les recettes des chefs du GaultMillau, perche, féra, omble et crevettes sont inratables.',
      };
    case 'suppen':
      return {
        recipeCategoryEnum: 'Suppen',
        label: 'Suppen',
        url: '/rezepte/kategorie/suppen',
        title: 'Rezepte: Suppen',
        lead: 'Bündner Gerstensuppe, Kürbissuppe, Gazpacho, Tom Kha Goong, Ramen & Pho Bo. Die GaultMillau-Chefs verraten ihre besten Suppenrezepte mit Gelinggarantie.',
      };
    case 'vegan-et-vegetarien':
      return {
        recipeCategoryEnum: 'Vegan & Vegetarien',
        label: 'Vegan & végétarien',
        url: '/fr/recettes/categorie/vegan-et-vegetarien',
        title: 'Recettes: Végane et végétarien',
        lead: 'Végane ou végétarien? Les chefs notés au GaultMillau développent des recettes simples, originales et savoureuses.',
      };
    case 'vegi-und-vegan':
      return {
        recipeCategoryEnum: 'Vegi & Vegan',
        label: 'Vegi & vegan',
        url: '/rezepte/kategorie/vegi-und-vegan',
        title: 'Rezepte: Vegi & vegan',
        lead: 'Vegi & vegan? Kein Problem, sagen GaultMillau-Chefs wie Zizi Hattab, Sebastian Rösch, Pascal Steffen, Tobias Hoesli und Nenad Mlinarevic. Die Rezepte.',
      };
    case 'asperges':
      return {
        recipeCategoryEnum: 'Asperges',
        label: 'Asperges',
        url: '/fr/recettes/categorie/asperges',
        title: 'Recettes: Asperges',
        lead: 'La période des asperges est arrivée! Découvrez les meilleures recettes de nos chefs.',
      };
    case 'spargeln':
      return {
        recipeCategoryEnum: 'Spargeln',
        label: 'Spargeln',
        url: '/rezepte/kategorie/spargeln',
        title: 'Rezepte: Spargeln',
        lead: 'Spargelzeit! Badischer Spargel und zarte, am gleichen Tag gestochene Stangen aus der Region sind die Lieblinge der GaultMillau-Köche. Die besten Rezepte der Starchefs.',
      };
    case 'viande':
      return {
        recipeCategoryEnum: 'Viande',
        label: 'Viande',
        url: '/fr/recettes/categorie/viande',
        title: 'Recettes: Viande',
        lead: 'Wagyu ou poulet grillé? Entrecôte ou boulettes? Tatare ou vitello tonnato? Les meilleures recettes de viande des chefs du GaultMillau.',
      };
    default:
      return {
        recipeCategoryEnum: '',
        label: '',
        url: '',
      };
  }
};
