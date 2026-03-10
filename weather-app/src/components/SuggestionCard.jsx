const SuggestionCard = ({ temperature, isRainy }) => {
  const getSuggestion = () => {
    if (isRainy) return "Don't forget your umbrella, we don't want you to get wet! ☔";

    if (temperature <= 5) return "It's freezing outside! You should wear a thick coat, scarf, and beanie. 🧣❄️";
    if (temperature > 5 && temperature <= 15) return "The weather is a bit chilly. A stylish jacket or a thick cardigan will do the trick. 🧥";
    if (temperature > 15 && temperature <= 22) return "Perfect sweatshirt weather! Put on something comfortable and head out. 👕";
    if (temperature > 22 && temperature <= 30) return "The weather is great! Wear your t-shirt and enjoy the sun. ☀️🕶️";
    if (temperature > 30) return "It's very hot! Choose thin, light-colored clothes and don't forget to drink plenty of water. 💧🏜️";

    return "Make sure to dress appropriately for the weather!";
  };

  return (
    <div className="suggestion-card">
      <div className="suggestion-icon">💡</div>
      <div className="suggestion-text">
        <p className="suggestion-title">Daily Suggestion</p>
        <p className="suggestion-desc">{getSuggestion()}</p>
      </div>
    </div>
  );
};

export default SuggestionCard;