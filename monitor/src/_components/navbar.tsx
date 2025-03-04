import Image from 'next/image';

export default function Navbar() {
  const userName = "José Miguel";
  const initials = userName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  return (
    <nav className="bg-primary text-white">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Image
            src="https://elasticbeanstalk-us-east-1-518344696083.s3.us-east-1.amazonaws.com/esg3-static-files/app/images/logos/LOGO-Positivo-Version-secundaria.png"
            alt="Logo"
            width={100}
            height={100}
            className="h-12 w-auto"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm font-medium">
          <a href="#" className="hover:text-gray-300 transition-colors">General</a>
          <a href="#" className="hover:text-gray-300 transition-colors">SASB</a>
          <a href="#" className="hover:text-gray-300 transition-colors">MAP</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Benchmarks</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Awards</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Time Trends</a>
        </div>

        {/* User Session */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-600 text-white font-semibold text-sm">
            {initials}
          </div>
        </div>
      </div>
    </nav>
  );
}