import React, { useState } from "react";
import "../../css/serviceStyle.css";


export default function ServicesDisplay({services, auth }) {
    
    const [Actualservices, setActualServices] = useState(services);
    return (
        <div className="relative">
            <table className="table-auto services-table">
                <thead className="services-table-head">
                    <tr>
                        <th>Nom</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {services.length === 0 && (
                        <tr>
                            <td colSpan="2">Pas de services</td>
                        </tr>
                    )}
                    {services.map((service) => (
                        <tr key={service.id}>
                            <td>{service.ser_nom}</td>
                            <td>
                                <a
                                    href={route("services.edit", {
                                        service: service.id,
                                    })}
                                >
                                    <button className="bouton-detail">
                                        Détail
                                    </button>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
