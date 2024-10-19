import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';


export default function UpdateProjectForm({ projet, clients, services }) {
    const { data, setData, patch, errors, processing } = useForm({
        nom: projet.nom,
        client_id: projet.client_id,
        service_id: projet.service_id,
        debut: projet.debut,
        deadline: projet.deadline,
        description: projet.description,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('projets.update', { id: projet.id }));
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div>
                <InputLabel htmlFor="nom" value="Nom du projet"/>
                <TextInput id="nom" value={data.nom} onChange={e => setData('nom', e.target.value)}/>
                <InputError message={errors.nom}/>
            </div>

            <div>
                <InputLabel htmlFor="client_id" value="Client"/>
                <select
                    id="client_id"
                    value={data.client_id}
                    onChange={e => setData('client_id', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    {clients && clients.map(client => (
                        <option key={client.id} value={client.id}>{client.cli_nom}</option>
                    ))}
                </select>
                <InputError message={errors.client_id}/>
            </div>

            <div>
                <InputLabel htmlFor="service_id" value="Service"/>
                <select
                    id="service_id"
                    value={data.service_id}
                    onChange={e => setData('service_id', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    {services.map(service => (
                        <option key={service.id} value={service.id}>{service.ser_nom}</option>
                    ))}
                </select>
                <InputError message={errors.service_id}/>
            </div>


            <div>
                <InputLabel htmlFor="debut" value="Date de début"/>
                <TextInput type="date" id="debut" value={data.debut} onChange={e => setData('debut', e.target.value)}/>
                <InputError message={errors.debut}/>
            </div>

            <div>
                <InputLabel htmlFor="deadline" value="Date limite"/>
                <TextInput type="date" id="deadline" value={data.deadline}
                           onChange={e => setData('deadline', e.target.value)}/>
                <InputError message={errors.deadline}/>
            </div>

            <div>
                <InputLabel htmlFor="description" value="Description"/>
                <textarea
                    id="description"
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                ></textarea>
                <InputError message={errors.description}/>
            </div>

            <PrimaryButton disabled={processing}>Mettre à jour</PrimaryButton>
        </form>
    );
}
