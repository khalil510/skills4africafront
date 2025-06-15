// src/components/Team.jsx (Alternative - try only if Solution 1 fails after diagnosis)
import React, { useState, useEffect } from 'react';
import api from '../api';

export const Team = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const response = await api.get('/team/');
                setTeamMembers(response.data);
            } catch (err) {
                setError('Failed to fetch team members.');
                console.error('Error fetching team members:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTeamMembers();
    }, []);

    if (loading) return <div>Loading team members...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div id="team" className="text-center">
            <div className="container">
                <div className="section-title">
                    <h2>Meet the Team</h2>
                    <p>Our team is qualified, passionate, and collaborative, composed of experienced professionals in various fields.</p>
                </div>
                {/* Alternative: Use custom flexbox for explicit 3-column behavior */}
                {/* Add a custom className to this div, e.g., "team-grid-row" */}
                <div className="row team-grid-custom"> {/* Added custom class for targeted CSS */}
                    {teamMembers.length > 0 ? (
                        teamMembers.map((member, i) => (
                            <div key={member.id} className="team-member-item"> {/* Custom class for each member */}
                                <div className="thumbnail">
                                    {" "}
                                    {member.photo && (
                                        <img
                                            src={member.photo}
                                            alt={member.name || "Team Member"}
                                            className="img-responsive team-img"
                                        />
                                    )}{" "}
                                    <div className="caption">
                                        <h4>{member.name}</h4>
                                        <p>{member.title_en}</p>
                                        {member.linkedin_url && (
                                            <p><a href={member.linkedin_url} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
                                        )}
                                        {member.bio_en && <p className="small">{member.bio_en}</p>}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No team members available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};