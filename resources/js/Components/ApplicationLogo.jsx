export default function ApplicationLogo(props) {
    return (
        <div className="text-center"> {/* Centre tout le contenu horizontalement */}
            {/* L'image */}
            <img
                src="/logo_white.png"
                alt="Your Company Logo"
                className="h-28 w-auto mx-auto"
                style={{ filter: 'saturate(0) brightness(0.3) sepia(1) hue-rotate(180deg)' }}
            />
            {/* Le texte */}
            <div className="text-lg font-bold text-black-500 mt-2">
                DOMITY
            </div>
        </div>
    );
}
