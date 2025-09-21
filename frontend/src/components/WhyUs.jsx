import React from 'react';
import { FaShieldAlt, FaSyncAlt, FaChartLine, FaLock } from 'react-icons/fa';

const features = [
     {
          icon: <FaSyncAlt className="text-3xl text-blue-600" />,
          title: "Seamless Integration",
          description: "Connect all your social media accounts in one place for unified management."
     },
     {
          icon: <FaChartLine className="text-3xl text-green-500" />,
          title: "Performance Insights",
          description: "Get detailed analytics about your posts' performance across all platforms."
     },
     {
          icon: <FaShieldAlt className="text-3xl text-purple-500" />,
          title: "Secure & Private",
          description: "Your data is encrypted and we never store your social media credentials."
     },
     {
          icon: <FaLock className="text-3xl text-yellow-500" />,
          title: "Controlled Access",
          description: "Full control over what permissions you grant to our application."
     }
];

const WhyUs = () => {
     return (
          <section className="relative py-16 bg-white overflow-hidden">
               {/* Decorative elements */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
               
               {/* Ad Space - Right Side */}
               <div className="hidden lg:block fixed right-0 top-1/2 transform -translate-y-1/2 w-48 bg-white shadow-lg rounded-l-lg p-4 z-10 border-l-4 border-blue-500">
                    <div className="text-center text-sm font-medium text-gray-500 mb-2">Sponsored</div>
                    <div className="bg-gray-100 rounded p-3 text-center">
                         <p className="text-xs text-gray-600 mb-2">Your Ad Here</p>
                         <div className="h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded flex items-center justify-center">
                              <span className="text-xs text-gray-400">Ad Space</span>
                         </div>
                         
                         <p className="text-xs mt-2 text-gray-500">Reach our audience</p>
                    </div>
               </div>

               <div className="container mx-auto px-6 relative z-0">
                    <div className="text-center mb-16">
                         <span className="inline-block px-4 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-4">WHY CHOOSE US</span>
                         <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Simplify Your Social Media</h2>
                         <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
                         <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                              Manage all your social media posts in one place, saving you time and effort. Our platform provides a unified view, easy editing, and seamless deletion across multiple social networks.
                         </p>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                         {features.map((feature, index) => (
                              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                                   <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                                        {feature.icon}
                                   </div>

                                   <h3 className="text-xl font-bold text-center text-gray-800 mb-2">{feature.title}</h3>
                                   <p className="text-gray-600 text-center">{feature.description}</p>
                              </div>
                         ))}
                    </div>

                    {/* Demo Video Section */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden">
                         <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200 rounded-full opacity-20"></div>
                         <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-200 rounded-full opacity-20"></div>
                         
                         <div className="relative z-10 text-center">
                              <h3 className="text-3xl font-bold text-gray-900 mb-4">See It In Action</h3>
                              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                                   Watch how SMD can transform your social media management in just a few clicks.
                              </p>

                              <div className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
                                   <div className="aspect-w-16 aspect-h-9 bg-black/5">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                             <div className="text-center">
                                                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-blue-700 transition-colors">
                                                       <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                                       </svg>
                                                  </div>
                                                  <p className="text-sm text-gray-500">Click to play demo</p>
                                             </div>
                                        </div>

                                        <video className="w-full h-auto" poster="/placeholder-video.jpg">
                                             <source src="" type="video/mp4" />
                                             Your browser does not support the video tag.
                                        </video>
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                         {[
                              { number: '10K+', label: 'Active Users' },
                              { number: '5+', label: 'Platforms' },
                              { number: '99.9%', label: 'Uptime' },
                              { number: '24/7', label: 'Support' }
                         ].map((stat, index) => (
                              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                   <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                                   <div className="text-gray-600">{stat.label}</div>
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     );
};

export default WhyUs;
