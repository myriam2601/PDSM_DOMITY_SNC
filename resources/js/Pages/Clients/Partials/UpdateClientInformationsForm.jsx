import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateClientInformationForm({ client, className = '' }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        cli_nom: client.cli_nom,
        cli_prenom: client.cli_prenom,
        cli_email: client.cli_email,
        cli_telephone: client.cli_telephone,
        cli_societe:client.cli_societe,
        cli_adresse:client.cli_adresse,
        cli_cli_npa:client.cli_cli_npa
        // Ajoutez d'autres champs selon vos besoins
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('clients.update', { id: client.id }));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Informations du Client</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Mettez à jour les informations du client.
                </p>
            </header>

                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="cli_nom" value="Nom"/>

                        <TextInput
                            id="cli_nom"
                            className="mt-1 block w-full"
                            value={data.cli_nom}
                            onChange={(e) => setData('cli_nom', e.target.value)}
                            required
                            isFocused
                        />

                        <InputError className="mt-2" message={errors.cli_nom}/>
                    </div>

                    <div>
                        <InputLabel htmlFor="cli_prenom" value="Prénom"/>

                        <TextInput
                            id="cli_prenom"
                            className="mt-1 block w-full"
                            value={data.cli_prenom}
                            onChange={(e) => setData('cli_prenom', e.target.value)}
                            required
                        />

                        <InputError className="mt-2" message={errors.cli_prenom}/>
                    </div>

                    <div>
                        <InputLabel htmlFor="cli_email" value="Email"/>

                        <TextInput
                            id="cli_email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.cli_email}
                            onChange={(e) => setData('cli_email', e.target.value)}
                            required
                        />

                        <InputError className="mt-2" message={errors.cli_email}/>
                    </div>

                    <div>
                        <InputLabel htmlFor="cli_telephone" value="Téléphone"/>

                        <TextInput
                            id="cli_telephone"
                            type="tel"
                            className="mt-1 block w-full"
                            value={data.cli_telephone}
                            onChange={(e) => setData('cli_telephone', e.target.value)}
                            required
                        />

                        <InputError className="mt-2" message={errors.cli_telephone}/>
                    </div>

                    <div>
                        <InputLabel htmlFor="cli_societe" value="Société"/>

                        <TextInput
                            id="cli_societe"
                            className="mt-1 block w-full"
                            value={data.cli_societe}
                            onChange={(e) => setData('cli_societe', e.target.value)}
                            required
                        />

                        <InputError className="mt-2" message={errors.cli_societe}/>
                    </div>

                    <div>
                        <InputLabel htmlFor="cli_adresse" value="Adresse"/>

                        <TextInput
                            id="cli_adresse"
                            className="mt-1 block w-full"
                            value={data.cli_adresse}
                            onChange={(e) => setData('cli_adresse', e.target.value)}
                            required
                        />

                        <InputError className="mt-2" message={errors.cli_adresse}/>
                    </div>

                    <div>
                        <InputLabel htmlFor="cli_cli_npa" value="Code postal"/>

                        <TextInput
                            id="cli_cli_npa"
                            type="number"
                            className="mt-1 block w-full"
                            value={data.cli_cli_npa}
                            onChange={(e) => setData('cli_cli_npa', e.target.value)}
                            required
                        />

                        <InputError className="mt-2" message={errors.cli_cli_npa}/>
                    </div>


                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Enregistrer</PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">Modifications enregistrées !</p>
                        </Transition>
                    </div>
                </form>
        </section>
);
}
