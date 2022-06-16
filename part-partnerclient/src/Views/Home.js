import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../Images/finalLogo.png';
import img2 from '../Images/carExample.png';
import img3 from '../Images/partExample.png';
import img4 from '../Images/slide1Photo.jpg';

export default function Home() {
    return (
        <div className="home-container">
        <div className="home-screen">
                <div className="container py-5">
                    <div className="row h-100 align-items-center py-5">
                        <div className="col-lg-6">
                            <h1 className="display-4">About this project</h1>
                            <p className="ptext">Part Partners is a Car and Part Tracker that users can use to track Cars and parts.
                              With more updates on the way please stay tuned for what this application has to offer!
                            </p>
                            <p className="lead text-muted">Snippet Credits <a href="https://bootstrapious.com/snippets" class="text-muted">
                                <u>Bootstrapious</u></a>
                            </p>
                        </div>
                        <div className="col-lg-6 d-none d-lg-block">
                            <img src={img1} alt="" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="home-container">
                <div className="container py-5">
                    <div className="row align-items-center mb-5">
                        <div className="col-lg-6 order-2 order-lg-1"><i class="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
                            <h2 className="font-weight-light">Creating a Car</h2>
                            <p className="ptext">Select view on your profile, copy your Id for tracking, then press the add button on the cars page.</p>
                            <Link to={`/cars`}>
                                <button type="button" className="btn btn-light px-5 rounded-pill shadow-sm">Cars</button>
                            </Link>
                        </div>
                        <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src={img2} alt="" class="img-fluid mb-4 mb-lg-0" />
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-5 px-5 mx-auto">
                            <img src={img3} alt="" className="img-fluid mb-4 mb-lg-0" />
                        </div>
                        <div className="col-lg-6"><i class="fa fa-leaf fa-2x mb-3 text-primary"></i>
                            <h2 className="font-weight-light">Creating a Part</h2>
                            <p className="ptext">Select view on your profile, copy your Id for tracking, then press the add button on the parts page.</p>
                            <Link to={`/parts`}>
                                <button type="button" className="btn btn-light px-5 rounded-pill shadow-sm">Parts</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="home-container">
                <div className="container py-5">
                    <div className="row mb-4">
                        <div className="col-lg-5">
                            <h2 className="display-4 font-weight-light">Developer</h2>
                        </div>
                    </div>

                    <div className="row text-center">

                        <div className="col-xl-3 col-sm-6 mb-5">
                            <div className="profile-card py-5 px-4">
                                <img src={img4} alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 className="mb-0">Steven Thacker</h5><span class="small text-uppercase text-muted">Software Engineer</span>
                                <ul className="social mb-0 list-inline mt-3">
                                    <p className="ptext"> My Linked In</p>
                                    <li className="list-inline-item"><a href="https://www.linkedin.com/in/k-thacker/" className="social-link"><i className="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <footer className="pb-5">
                <div className="container text-center">
                    <p className="ptext">Thank you for Viewing my app.</p>
                </div>
            </footer>
        </div>
    );
}