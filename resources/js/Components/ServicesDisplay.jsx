import React from "react";
import "../../css/serviceStyle.css"
import { InertiaLink } from "@inertiajs/inertia-react";

export default function ServicesDisplay({ services, auth }) {
    return (

        <table className="table-auto services-table">
            <thead className="services-table-head">
            <tr>
                <th>Nom</th>
                <th> </th>
            </tr>
            </thead>
            <tbody>
            {services.length===0 && (
                <tr>
                    <td>
                        Pas de services
                    </td>
                </tr>
            )}
            {services.map((service)=>{
                return (
                    <tr>
                        <td>{service.ser_nom}</td>
                        <td>
                            <a href={route('services.edit', { service: service.id })}>
                            <button className="bouton-detail">
                                Détail
                            </button>
                            </a>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>

    );
}
