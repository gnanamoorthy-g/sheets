import "./userAvatar.css";

function Avatar({ userName }) {

    const getInitials = (name) => {
        if (!name) return '';
        const nameParts = name.split(' ');
        const initials = nameParts.map(part => part[0]).join('');
        return initials.toUpperCase();
    };


    return (
        <div className="user-avatar">
            {getInitials(userName)}
        </div>
    );
}

export default Avatar;