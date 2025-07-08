import Link from "next/link";
import { useTranslations } from "next-intl";
import { GetStaticProps } from "next";
import { getTranslationsForPages } from "@/lib/translations";

export default function About() {
  const t = useTranslations("common");
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Über uns</h1>

        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          <p className="text-blue-800">📍 Diese Seite nutzt den Pages Router</p>
        </div>

        <div className="prose max-w-none">
          <p className="text-lg mb-4">
            Willkommen auf unserer Über-uns-Seite. Hier erfahren Sie mehr über
            unser Unternehmen und unsere Mission.
          </p>

          <p className="mb-4">
            Wir sind ein innovatives Unternehmen, das sich der Entwicklung
            modernster Webtechnologien widmet. Unser Team besteht aus erfahrenen
            Entwicklern, die sich leidenschaftlich für sauberen Code und
            benutzerfreundliche Anwendungen einsetzen.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Unsere Werte</h2>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Innovation und kontinuierliche Verbesserung</li>
            <li>Qualität in allem, was wir tun</li>
            <li>Transparenz und offene Kommunikation</li>
            <li>Nachhaltigkeit und Verantwortung</li>
          </ul>
        </div>

        <div className="mt-8 space-x-4">
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {t("backToHome")}
          </Link>
          <Link
            href="/contact"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Kontakt aufnehmen
          </Link>
          <Link
            href="/products/1"
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
          >
            Produkte ansehen
          </Link>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      ...(await getTranslationsForPages(["common"])),
    },
  };
};
