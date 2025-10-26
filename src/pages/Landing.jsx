import React from 'react';
import './Landing.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div>
            {/* Hero Section */}
            <section id="hero">
                <div className="hero-box text-center">
                    <h1>Create Stunning Posters</h1>
                    <p>Your story, your design, your poster — all in one place.</p>
                    <Link to="/form">
                        <Button variant="contained" color="primary">
                            Start Creating
                        </Button>
                    </Link>

                </div>
            </section>

            {/* Features Section */}
            <section id="features">
                <h2>Features</h2>
                <div className="features-row">
                    <div className="feature">
                        <h4>Create</h4>
                        <p>Design your poster with a simple form.</p>
                    </div>
                    <div className="feature">
                        <h4>Update</h4>
                        <p>Edit any poster anytime from your history.</p>
                    </div>
                    <div className="feature">
                        <h4>Delete</h4>
                        <p>Remove unwanted posters with a click.</p>
                    </div>
                    <div className="feature">
                        <h4>Download</h4>
                        <p>Save your poster as an image using HTMLCanvas.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
