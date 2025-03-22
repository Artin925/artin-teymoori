export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  additionalImages?: string[]; // Zusätzliche Bilder für die erweiterte Ansicht
  link?: string;
  detailDescription?: string; // Ausführlichere Beschreibung für die Detailansicht
}

// Hilfsfunktion zum Verarbeiten von Bildpfaden
export const safeImagePath = (path: string) => {
  // Zerlege den Pfad in Verzeichnispfad und Dateiname
  const lastSlashIndex = path.lastIndexOf('/');
  const directory = path.substring(0, lastSlashIndex + 1);
  const filename = path.substring(lastSlashIndex + 1);
  
  // Erstelle einen sicheren Pfad, indem du den Dateinamen enkodierst
  // aber behalte die Struktur des Verzeichnisses bei
  return `${directory}${encodeURIComponent(filename)}`;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "FitAmCampus WebApp",
    description: "Eine Sportplattform für Studierende, entwickelt mit HTML, CSS, Bootstrap und Kotlin",
    tags: ["Web", "UI/UX", "Kotlin"],
    image: safeImagePath("/images/projects/uni/fitamcampus.png"),
    detailDescription: "FitAmCampus ist eine Webplattform, die Studierenden ermöglicht, Sportangebote an der Hochschule zu entdecken und sich für Kurse anzumelden. Das Projekt wurde mit modernen Web-Technologien und Kotlin für die Serverseite entwickelt. Die Plattform bietet Funktionen wie Kurssuche, Anmeldung, Erinnerungen und Bewertungen. Als Teil eines studentischen Teams war ich hauptsächlich für das Frontend und die Benutzererfahrung verantwortlich. Die Herausforderung bestand darin, eine intuitive Benutzeroberfläche zu schaffen, die auch auf mobilen Geräten gut funktioniert."
  },
  {
    id: 2,
    title: "Redesign CDA",
    description: "UI/UX-Optimierung der Cransch Digital Archive Website mit Figma",
    tags: ["UI/UX"],
    image: safeImagePath("/images/projects/figma/uni/cda.jpg"),
    additionalImages: [
      safeImagePath("/images/projects/figma/uni/cda1.jpg"),
      safeImagePath("/images/projects/figma/uni/CDA Redesign 2025 - Homepage.jpg"),
      safeImagePath("/images/projects/figma/uni/CDA Redesign 2025 - Frame 1.jpg")
    ],
    detailDescription: "Das Cransch Digital Archive benötigte ein modernes, nutzerfreundliches Interface. Mein Redesign-Vorschlag konzentrierte sich auf eine bessere Informationsarchitektur und intuitivere Navigation durch die umfangreichen Archivbestände. Der Entwurf umfasst eine verbesserte Suchfunktion, eine klarere Darstellung von Archivmaterialien und eine responsive Gestaltung für verschiedene Bildschirmgrößen. Besonderer Wert wurde auf Barrierefreiheit und eine konsistente visuelle Sprache gelegt. Die Designs wurden in Figma erstellt und mit interaktiven Prototypen validiert."
  },
  {
    id: 3,
    title: "Bio-Laden App",
    description: "Einkaufs-App mit UX/UI-Design in Figma und Teamarbeit auf Miro",
    tags: ["App", "UI/UX"],
    image: safeImagePath("/images/projects/figma/uni/bio-laden.png"),
    detailDescription: "Die Bio-Laden App ermöglicht Kunden, Bio-Produkte zu durchsuchen, zu bestellen und Informationen über deren Herkunft zu erfahren. Das Design wurde mittels Figma erstellt und in enger Zusammenarbeit mit Stakeholdern auf Miro entwickelt. Die App bietet Funktionen wie Produktkategorisierung, Nährwertinformationen, Herkunftsnachverfolgung, Einkaufslisten und Benachrichtigungen über saisonale Angebote. Der Designprozess umfasste umfangreiche Nutzerforschung, Wireframing, Prototyping und mehrere Iterationen basierend auf Nutzerfeedback."
  },
  {
    id: 4,
    title: "Ice Flow Figma Challenge",
    description: "UI/UX-Design Challenge mit Fokus auf modernes, intuitives Interface",
    tags: ["UI/UX"],
    image: safeImagePath("/images/projects/figma/ice-flow.png"),
    additionalImages: [
      safeImagePath("/images/projects/figma/ice-flow.1.png"),
      safeImagePath("/images/projects/figma/ice-flow.2.png"),
      safeImagePath("/images/projects/figma/ice-flow.3.png")
    ],
    detailDescription: "Bei dieser Design-Challenge lag der Fokus auf der Erstellung eines modernen und intuitiven Interfaces für eine fiktive App namens 'Ice Flow'. Ziel war es, ein klares, ansprechendes Design zu schaffen, das Benutzer durch komplexe Aufgaben führt. Die Hauptherausforderung bestand darin, komplexe Funktionen in einer einfachen, ästhetisch ansprechenden Oberfläche zu präsentieren. Ich entwickelte ein System aus visuell konsistenten Komponenten, die verschiedene Interaktionszustände und Animationen berücksichtigen. Das Farbschema wurde speziell gewählt, um die Markenidentität zu stärken und gleichzeitig optimale Lesbarkeit und Zugänglichkeit zu gewährleisten."
  },
  {
    id: 5,
    title: "S.K. Reinigungsservice",
    description: "UI/UX-Design der Website mit Figma",
    tags: ["Web", "UI/UX"],
    image: safeImagePath("/images/projects/other/reinigung.png"),
    detailDescription: "Für den S.K. Reinigungsservice entwickelte ich ein professionelles Webdesign, das die Dienstleistungen klar präsentiert und potenzielle Kunden anspricht. Der Fokus lag auf einfacher Navigation und klaren Call-to-Actions. Die Website bietet eine übersichtliche Struktur mit Bereichen für Dienstleistungen, Preise, Kundenreferenzen und Kontaktmöglichkeiten. Besonders wichtig war die Implementierung eines benutzerfreundlichen Formulars zur Anfrage von individuellen Angeboten. Das Design wurde in Figma erstellt und anschließend als interaktiver Prototyp zur Validierung mit dem Kunden genutzt."
  },
  {
    id: 6,
    title: "Aktien Monitor - Classic",
    description: "Web-App zur Aktienüberwachung mit klassischem Design",
    tags: ["Web", "Coding Challenge"],
    image: safeImagePath("/images/projects/other/akiten-monitor.png"),
    link: "https://aktienmonitor-classic.netlify.app/",
    detailDescription: "Der Aktien Monitor ist eine Web-Anwendung, die Echtzeit-Daten von Aktien visualisiert und überwacht. Diese Version verwendet ein klassisches, übersichtliches Design für optimale Lesbarkeit und schnellen Zugriff auf wichtige Informationen. Die Anwendung bietet Funktionen wie personalisierte Watchlists, Preisalarme, historische Daten-Visualisierung und Trendanalysen. Ein besonderer Fokus wurde auf die Performance und Zuverlässigkeit der Datenaktualisierung gelegt, um Anlegern stets aktuelle Informationen zu bieten. Die Benutzeroberfläche ist intuitiv gestaltet und ermöglicht auch Einsteigern einen schnellen Überblick über ihre Aktieninvestments."
  },
  {
    id: 7,
    title: "Aktien Monitor - Futuristisch",
    description: "Alternative Version mit futuristischem UI-Design",
    tags: ["Web", "UI/UX", "Coding Challenge"],
    image: safeImagePath("/images/projects/other/aktien-monito-futuristic.png"),
    link: "https://aktienmonitor-futuristic.netlify.app/",
    detailDescription: "Als Alternative zum klassischen Design habe ich eine futuristische Version des Aktien Monitors entwickelt. Mit dunklem Farbschema und dynamischen Elementen bietet diese Version ein modernes, technisches Erscheinungsbild. Die Benutzeroberfläche zeichnet sich durch ein dunkles Thema aus, das Augenermüdung reduziert und die Aufmerksamkeit auf wichtige Daten lenkt. Innovative Visualisierungen wie Heat Maps, 3D-Diagramme und animierte Übergänge verbessern das Verständnis komplexer Finanzinformationen. Die Benutzeroberfläche passt sich dynamisch an die Bildschirmgröße an und bietet auf größeren Displays erweiterte Analysemöglichkeiten."
  },
  {
    id: 8,
    title: "Leadtributor WebApp",
    description: "Weiterentwicklung mit Vue.js und Vuetify, Refactoring für Codequalität",
    tags: ["Web", "Vue", "Professional"],
    image: safeImagePath("/images/projects/leadtributor/Screenshot 2025-02-17 at 21.27.02.png"),
    additionalImages: [
      safeImagePath("/images/projects/leadtributor/Screenshot 2025-02-17 at 21.27.10.png"),
      safeImagePath("/images/projects/leadtributor/Screenshot 2025-03-22 at 10.54.16.png"),
      safeImagePath("/images/projects/leadtributor/Screenshot 2025-02-17 at 21.20.01.png"),
      safeImagePath("/images/projects/leadtributor/Screenshot 2025-02-19 at 10.31.54.png"),
      safeImagePath("/images/projects/leadtributor/Screenshot 2025-02-19 at 10.32.12.png")
    ],
    link: "https://www.leadtributor.com/",
    detailDescription: "Bei Leadtributor arbeitete ich an der Weiterentwicklung der Hauptanwendung mit Vue.js und Vuetify. Meine Aufgaben umfassten Bugfixing, Implementierung neuer Features und Refactoring bestehenden Codes für bessere Wartbarkeit. Als Teil des Entwicklungsteams verbesserte ich die Performanz der Anwendung durch Optimierung der Komponenten-Struktur und Implementierung effizienter State-Management-Lösungen. Zusätzlich entwickelte ich neue Benutzeroberflächen für die Lead-Verwaltung und integrierte APIs für CRM-Systeme. Der agile Entwicklungsprozess umfasste regelmäßige Code-Reviews und enge Zusammenarbeit mit dem Produktmanagement."
  },
  {
    id: 9,
    title: "Flyer-Designs",
    description: "Sammlung verschiedener Flyer-Designs für diverse Zwecke",
    tags: ["Design", "UI/UX"],
    image: safeImagePath("/images/projects/other/flyers/Brown and White Modern Home For Sale Flyer.png"),
    additionalImages: [
      safeImagePath("/images/projects/other/flyers/Blue and Black Modern Home For Sale Flyer (Your Story) (2).png"),
      safeImagePath("/images/projects/other/flyers/Black and Grey Modern Business Webinar Flyer (3).png")
    ],
    detailDescription: "Diese Sammlung von Flyer-Designs umfasst verschiedene Stile und Zwecke - von Immobilienanzeigen bis zu Veranstaltungswerbung. Jedes Design wurde mit Fokus auf klare Kommunikation und ansprechendes Layout erstellt. Die Flyer zeichnen sich durch eine strategische Verwendung von Typografie, Farben und Bildern aus, um die gewünschte Botschaft effektiv zu vermitteln. Bei der Gestaltung wurde besonderer Wert auf Lesbarkeit, visuelle Hierarchie und zielgruppengerechte Ansprache gelegt. Die Designs wurden mit modernen Design-Tools erstellt und entsprechen den aktuellen Trends in der visuellen Kommunikation."
  },
  {
    id: 10,
    title: "Revoseal WordPress Redesign",
    description: "Professionelles Redesign einer WordPress-Seite mit modernem UI/UX Ansatz",
    tags: ["Web", "Professional", "UI/UX"],
    image: safeImagePath("/images/projects/revoseal/screencapture-debug-revoseal-contact-2025-02-17-21_49_32.png"),
    additionalImages: [
      safeImagePath("/images/projects/revoseal/screencapture-debug-revoseal-products-2025-02-17-21_54_44.png")
    ],
    detailDescription: "Für Revoseal führte ich ein komplettes Redesign ihrer WordPress-Website durch. Das Projekt umfasste die Neugestaltung des Layouts, die Implementierung eines modernen Designsystems und die Optimierung der Benutzerführung. Besonderes Augenmerk wurde auf responsives Design und Ladegeschwindigkeit gelegt. Ich arbeitete eng mit dem Kunden zusammen, um ein Design zu entwickeln, das sowohl die Markenidentität stärkt als auch die Benutzererfahrung verbessert. Das Ergebnis war eine moderne, benutzerfreundliche Website, die die Konversionsrate deutlich steigerte und die Online-Präsenz des Unternehmens auf ein neues Niveau hob."
  }
]; 