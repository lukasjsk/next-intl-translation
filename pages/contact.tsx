import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { GetStaticProps } from "next";
import { getTranslationsForPages } from "@/lib/translations";

export default function Contact() {
  const t = useTranslations("forms.contact");
  const tCommon = useTranslations("common");
  const tValidation = useTranslations("forms.validation");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t("success"));
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>

        <div className="bg-green-50 p-4 rounded-lg mb-8">
          <p className="text-green-800">
            📍 Diese Seite nutzt den Pages Router
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">{t("subtitle")}</h2>
            <p className="text-gray-600 mb-6">{t("description")}</p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">{t("address.title")}</h3>
                <p className="text-gray-600">
                  {t("address.street")}
                  <br />
                  {t("address.city")}
                  <br />
                  {t("address.country")}
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Telefon</h3>
                <p className="text-gray-600">+49 123 456 789</p>
              </div>

              <div>
                <h3 className="font-semibold">E-Mail</h3>
                <p className="text-gray-600">info@beispiel.de</p>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("name")} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("email")} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("message")} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {t("send")}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 space-x-4">
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {tCommon("backToHome")}
          </Link>
          <Link
            href="/about"
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
          >
            Über uns
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
      ...(await getTranslationsForPages(["common", "forms"])),
    },
  };
};
