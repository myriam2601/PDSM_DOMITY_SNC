import React, {useState} from "react";
import DefaultDashboardLayout from "../../Layouts/DefaultDashboardLayout";
import { PhotoIcon } from "@heroicons/react/24/solid";

export default function AppParams() {
    const [formData, setFormData] = useState({
        par_nom_societe: "",
        par_adresse: "",
        par_npa: "",
        par_email: "",
        par_telephone: "",
        par_site_web: "",
    });
  return (

    <DefaultDashboardLayout>
      <div className="divide-y divide-white/5 bg-white">
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-primaryDarkBlue">
              Définissez vos paramètres d'application
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Ici, vous pouvez modifier l'identité de votre application de
              gestion
            </p>
          </div>

          <form className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-primaryDarkBlue"
                >
                  Nom de la société
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryDarkBlue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-6 rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600 items-center justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span className="inline-block">
                        Télécharger un fichier
                      </span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, SVG
                  </p>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="Adresse"
                  className="block text-sm font-medium leading-6 text-primaryDarkBlue"
                >
                  Adresse
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="Adresse"
                    id="Adresse"
                    autoComplete="Adresse"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryDarkBlue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="npa"
                  className="block text-sm font-medium leading-6 text-primaryDarkBlue"
                >
                  NPA
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="npa"
                    id="npa"
                    autoComplete="npa"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryDarkBlue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="localite"
                  className="block text-sm font-medium leading-6 text-primaryDarkBlue"
                >
                  Localité
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="localite"
                    id="localite"
                    autoComplete="localite"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryDarkBlue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-primaryDarkBlue"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryDarkBlue sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="site-web"
                  className="block text-sm font-medium leading-6 text-primaryDarkBlue"
                >
                  Site web
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primaryDarkBlue">
                    <input
                      type="text"
                      name="site-web"
                      id="site-web"
                      autoComplete="site-web"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryDarkBlue sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="telephone"
                  className="block text-sm font-medium leading-6 text-primaryDarkBlue"
                >
                  Téléphone
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primaryDarkBlue">
                    <input
                      type="text"
                      name="telephone"
                      id="telephone"
                      autoComplete="telephone"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryDarkBlue sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex">
              <button
                type="submit"
                className="rounded-md bg-primaryDarkBlue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-greySecond hover:text-primaryDarkBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryDarkBlue"
              >
                Enregistrer les informations
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultDashboardLayout>
  );
}
