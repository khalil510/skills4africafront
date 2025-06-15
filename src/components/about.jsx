// src/components/about.jsx (or similar component)
import React, { useState, useEffect } from 'react';
import api from '../api'; // Import your axios instance

export const About = () => {
    const [organizationInfo, setOrganizationInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrganizationInfo = async () => {
            try {
                // Fetch the single OrganizationInfo object
                const response = await api.get('/organization-info/');
                setOrganizationInfo(response.data); // Assuming response.data is the single object
            } catch (err) {
                setError('Failed to fetch organization information.');
                console.error('Error fetching organization info:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrganizationInfo();
    }, []); // Empty dependency array means this runs once on mount

    if (loading) return <div>Loading about us...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!organizationInfo) return <div>No organization information found.</div>;

    return (
        <div id="about">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        {/* Assuming your template has an image section */}
                        <img src="img/about.jpg" className="img-responsive" alt="" />{" "}
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <div className="about-text">
                            {/* Using fetched data for About Us section */}
                            <h2>About Us</h2>
                            <p>{organizationInfo.about_us_en}</p> {/* English content */}
                            {/* If you want to handle language switching, you'd add logic here */}
                            <h3>Why Choose Us?</h3>
                            {/* Assuming values are in a text field, you might split by newline or render as is */}
                            <p>{organizationInfo.values_en}</p>
                            {/* Example of how you might display values as list items if parsed */}
                            {/* <ul>
                                {organizationInfo.values_en.split('\n').map((value, i) => (
                                    <li key={i}>{value}</li>
                                ))}
                            </ul> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};