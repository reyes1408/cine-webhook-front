const silla = ({ comprado }) => {
    return (
      <div className={`w-16 h-16 rounded-lg ${comprado ? 'bg-blue-900' : 'bg-gray-300'}`}></div>
    );
  };

export default silla;