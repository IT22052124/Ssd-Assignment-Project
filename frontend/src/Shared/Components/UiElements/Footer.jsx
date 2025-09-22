import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-200 py-6">
            <div className="container mx-auto px-6">
                <div className="lg:flex">
                
                    <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
                        <div className="mb-6 md:mb-0 flex items-center">
                            <a href="https://flowbite.com/" className="flex items-center">
                                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
                                <span className="self-center text-2xl font-medium whitespace-nowrap dark:text-white">WeManage</span>
                                <br />
                                <br />
                                <br />
                            </a>
                        </div>
                        <h5 className="font-bold text-gray-100 uppercase" style={{ fontSize: '0.875rem' }}>About Us</h5>
                        <p className="mt-2" style={{ fontSize: '0.875rem' }}>Kandurata Glass and Aluminium is a wholesale and retail single-branched business which sells aluminium bars, glass,locks and other accessories</p>
                    </div>
                    <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
                        <h5 className="font-bold text-gray-100 uppercase" style={{ fontSize: '0.875rem' }}>Quick Links</h5>
                        <ul className="mt-2">
                            <li><a href="#" className="hover:text-gray-300">Home</a></li>
                            <li><a href="#" className="hover:text-gray-300">About Us</a></li>
                            <li><a href="#" className="hover:text-gray-300">Services</a></li>
                            <li><a href="#" className="hover:text-gray-300">Contact</a></li>
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
                        <h5 className="font-bold text-gray-100 uppercase" style={{ fontSize: '0.875rem' }}>Services</h5>
                        <ul className="mt-2">
                            <li><a href="#" className="hover:text-gray-300">Task Management</a></li>
                            <li><a href="#" className="hover:text-gray-300">Project Management</a></li>
                            <li><a href="#" className="hover:text-gray-300">Team Collaboration</a></li>
                            <li><a href="#" className="hover:text-gray-300">Document Sharing</a></li>
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
                        <h5 className="font-bold text-gray-100 uppercase" style={{ fontSize: '0.875rem' }}>Follow Us</h5>
                        <ul className="mt-2 flex items-center flex-wrap">
                            <li className="mr-3">
                                <a href="#" className="hover:text-gray-300 flex items-center">
                                    <FaFacebook className="w-5 h-5" />
                                    <span className="ml-2">Facebook</span>
                                </a>
                            </li>
                            </ul>
                            <ul className="mt-2 flex items-center flex-wrap">
                            <li className="mr-3">
                                <a href="#" className="hover:text-gray-300 flex items-center">
                                    <FaTwitter className="w-5 h-5" />
                                    <span className="ml-2">Twitter</span>
                                </a>
                            </li>
                            </ul>
                            <ul className="mt-2 flex items-center flex-wrap">
                            <li className="mr-3">
                                <a href="#" className="hover:text-gray-300 flex items-center">
                                    <FaInstagram className="w-5 h-5" />
                                    <span className="ml-2">Instagram</span>
                                </a>
                            </li>
                            </ul>
                            <ul className="mt-2 flex items-center flex-wrap">
                            <li>
                                <a href="#" className="hover:text-gray-300 flex items-center">
                                    <FaLinkedin className="w-5 h-5" />
                                    <span className="ml-2">LinkedIn</span>
                                </a>
                            </li>
                            </ul>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6">
                <div className="border-t-2 border-gray-700 flex items-center justify-between">
                    <div className="text-sm">
                        <p>&copy; 2024 WeManage. All rights reserved.</p>
                    </div>
                    <div className="text-sm">
                        <p>Designed by <a href="#" className="text-gray-200 hover:underline">WeManage™</a></p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
