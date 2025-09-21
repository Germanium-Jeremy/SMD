import { FaFacebook, FaInstagram, FaPlus, FaTelegram, FaTwitter } from "react-icons/fa";

export default [
    { id: 'all', name: 'All', icon: <FaPlus className="mr-2" />, color: 'text-gray-700' },
    { id: 'x', name: 'X', icon: <FaTwitter className="mr-2" />, color: 'text-black' },
    { id: 'facebook', name: 'Facebook', icon: <FaFacebook className="mr-2" />, color: 'text-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: <FaInstagram className="mr-2" />, color: 'text-pink-600' },
    { id: 'telegram', name: 'Telegram', icon: <FaTelegram className="mr-2" />, color: 'text-blue-400' },
];