import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const reviews = [
     {
          id: 1,
          name: 'Alex Johnson',
          role: 'Social Media Manager',
          content: 'SMD has revolutionized how I manage multiple client accounts. The unified dashboard saves me hours every week!',
          rating: 5,
          image: 'https://randomuser.me/api/portraits/men/32.jpg'
     },
     {
          id: 2,
          name: 'Sarah Williams',
          role: 'Content Creator',
          content: 'I love being able to edit and delete posts across all my socials from one place. Game changer!',
          rating: 4,
          image: 'https://randomuser.me/api/portraits/women/44.jpg'
     },
     {
          id: 3,
          name: 'Michael Chen',
          role: 'Small Business Owner',
          content: 'The analytics and post management features have helped me grow my online presence significantly.',
          rating: 5,
          image: 'https://randomuser.me/api/portraits/men/75.jpg'
     },
];

const Reviews = () => {
     return (
          <section className="pb-[8rem] bg-gradient-to-b from-white to-blue-50">
               <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-4">What Our Users Say</h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                         Join thousands of satisfied users who have transformed their social media management
                    </p>
            
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                         {reviews.map((review) => (
                         <div key={review.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                              <div className="flex items-center mb-4">
                                   <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                                   <div>
                                        <h4 className="font-semibold text-gray-800">{review.name}</h4>
                                        <p className="text-sm text-gray-500">{review.role}</p>
                                   </div>
                              </div>

                            <div className="text-yellow-400 mb-3 flex">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                                ))}
                            </div>

                            <FaQuoteLeft className="text-blue-200 text-2xl mb-3" />
                            <p className="text-gray-600 italic">{review.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
