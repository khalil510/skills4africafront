// skills4africa_frontend/src/components/Contact.jsx
import React, { useState, useEffect } from 'react';
import api from '../api'; // Import your axios instance

// Initial state for the contact form fields
const initialState = {
    name: '',
    email: '',
    message: '',
    subject: '', // Added subject based on Django model
};

export const Contact = () => {
    // State to manage form fields
    const [{ name, email, message, subject }, setState] = useState(initialState);
    // State to manage the status of form submission (e.g., "Submitting...", "Success!", "Error!")
    const [submitStatus, setSubmitStatus] = useState('');
    // State to store organization information fetched from the backend
    const [organizationInfo, setOrganizationInfo] = useState(null);
    // State to manage loading status of organization info
    const [loadingOrgInfo, setLoadingOrgInfo] = useState(true);
    // State to manage any errors during fetching organization info
    const [errorOrgInfo, setErrorOrgInfo] = useState(null);

    // useEffect hook to fetch organization contact info when the component mounts
    useEffect(() => {
        const fetchOrganizationInfo = async () => {
            try {
                // Make API call to get organization information.
                // Our Django view for organization-info returns a single object
                // directly from its `list` method.
                const response = await api.get('/organization-info/');
                setOrganizationInfo(response.data); // Set the fetched data to state
            } catch (err) {
                setErrorOrgInfo('Failed to load contact information.');
                console.error('Error fetching organization info for contact:', err);
            } finally {
                setLoadingOrgInfo(false); // Set loading to false once fetching is complete (success or error)
            }
        };
        fetchOrganizationInfo();
    }, []); // Empty dependency array means this effect runs only once after the initial render

    // Handler for changes in form input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior (page reload)
        setSubmitStatus('Submitting...'); // Show submitting status
        try {
            // Send form data to the Django API's contact-submissions endpoint
            await api.post('/contact-submissions/', {
                name,
                email,
                subject,
                message,
            });
            setSubmitStatus('Message sent successfully!'); // Show success message
            setState(initialState); // Clear the form fields after successful submission
        } catch (error) {
            setSubmitStatus('Failed to send message. Please try again.'); // Show error message
            console.error('Error submitting contact form:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <div id="contact">
                <div className="container">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="section-title">
                                <h2>Get In Touch</h2>
                                <p>Please fill out the form below to send us an email and we will get back to you as soon as possible.</p>
                            </div>
                            <form name="sentMessage" validate="true" onSubmit={handleSubmit}> {/* Added validate="true" as an attribute */}
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-control"
                                                placeholder="Name"
                                                required
                                                onChange={handleChange}
                                                value={name}
                                            />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Email"
                                                required
                                                onChange={handleChange}
                                                value={email}
                                            />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        className="form-control"
                                        placeholder="Subject (Optional)"
                                        onChange={handleChange}
                                        value={subject}
                                    />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="form-group">
                                    <textarea
                                        name="message"
                                        id="message"
                                        className="form-control"
                                        rows="4"
                                        placeholder="Message"
                                        required
                                        onChange={handleChange}
                                        value={message}
                                    ></textarea>
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div id="success">{submitStatus}</div> {/* Display submission status */}
                                <button type="submit" className="btn btn-custom btn-lg">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                    {/* Contact Information Section */}
                    <div className="col-md-3 col-md-offset-1 contact-info">
                        <div className="contact-item">
                            <h3>Contact Info</h3>
                            {loadingOrgInfo ? (
                                <p>Loading contact information...</p> // Show loading state
                            ) : errorOrgInfo ? (
                                <> {/* Use a fragment to wrap the error message */}
                                    <p>Error: {errorOrgInfo}</p> {/* Moved comment */}
                                </>
                            ) : organizationInfo ? ( // If organizationInfo is available
                                <>
                                    <p>
                                        <span>
                                            <i className="fa fa-map-marker"></i> Address
                                        </span>{" "}
                                        {organizationInfo.address} {/* Display address from Django backend */}
                                    </p>
                                    <p>
                                        <span>
                                            <i className="fa fa-phone"></i> Phone
                                        </span>{" "}
                                        {organizationInfo.phone_number} {/* Display phone number */}
                                    </p>
                                    {organizationInfo.whatsapp_number && ( // Conditionally display WhatsApp if available
                                        <p>
                                            <span>
                                                <i className="fa fa-whatsapp"></i> WhatsApp
                                            </span>{" "}
                                            {organizationInfo.whatsapp_number} {/* Display WhatsApp number */}
                                        </p>
                                    )}
                                    <p>
                                        <span>
                                            <i className="fa fa-envelope-o"></i> Email
                                        </span>{" "}
                                        {organizationInfo.email} {/* Display email */}
                                    </p>
                                </>
                            ) : (
                                <p>No contact information available.</p> // If no data is found
                            )}
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="social">
                                    <ul>
                                        {organizationInfo && organizationInfo.linkedin_url && ( // Conditionally display LinkedIn if available
                                            <li>
                                                <a href={organizationInfo.linkedin_url} target="_blank" rel="noopener noreferrer">
                                                    <i className="fa fa-linkedin"></i>
                                                </a>
                                            </li>
                                        )}
                                        {organizationInfo && organizationInfo.whatsapp_number && ( // Conditionally display WhatsApp social link if available
                                            <li>
                                                <a href={`https://wa.me/${organizationInfo.whatsapp_number}`} target="_blank" rel="noopener noreferrer">
                                                    <i className="fa fa-whatsapp"></i>
                                                </a>
                                            </li>
                                        )}
                                        {/* You can add more social media links here if your OrganizationInfo model supports them */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="footer">
                <div className="container text-center">
                    <p>
                        &copy; 2025 Skills 4 Africa. Design by{" "}
                        <a href="http://www.templatewire.com" rel="nofollow">
                            TemplateWire
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};