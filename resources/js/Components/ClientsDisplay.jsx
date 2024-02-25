// ClientsDisplay.jsx

import React from "react";
import ClientCard from "@/Components/ClientCard";

export default function ClientsDisplay({ clients, auth }) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {clients.map((client) => (
                <ClientCard key={client.id} client={client} auth={auth} />
            ))}
        </div>
    );
}
