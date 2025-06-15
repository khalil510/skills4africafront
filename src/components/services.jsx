// src/components/Services.jsx
import React, { useState, useEffect } from 'react';
import api from '../api';

export const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get('/services/');
                setServices(response.data);
            } catch (err) {
                setError('Failed to fetch services.');
                console.error('Error fetching services:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    if (loading) return <div>Loading services...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div id="services" className="text-center">
            <div className="container">
                <div className="section-title">
                    <h2>Our Services</h2>
                    <p>Skills 4 Africa is organized around 5 main axes to support, sustain and guide our clients in their projects.</p> {/* This description is from your presentation  */}
                </div>
                <div className="row"> {/* This is a Bootstrap row */}
                    {services.length > 0 ? (
                        services.map((service) => (
                            // Use col-md-4 for 3 items per row on medium and larger screens (12 / 4 = 3)
                            // col-sm-6 for 2 items per row on small screens (12 / 6 = 2)
                            // col-xs-12 for 1 item per row on extra small screens (12 / 12 = 1)
                            <div key={service.id} className="col-md-4 col-sm-6 col-xs-12 service-item">
                                {" "}
                                {/* Assuming your service.icon_class holds a Font Awesome class name */}
                                {service.icon_class && <i className={service.icon_class}></i>}{" "}
                                <div className="service-desc">
                                    <h3>{service.title_en}</h3> {/* Display English title */}
                                    <p>{service.description_en}</p> {/* Display English description */}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No services available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};