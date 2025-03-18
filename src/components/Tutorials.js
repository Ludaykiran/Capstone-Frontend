import React, { useState } from 'react';
import "./Tutorials.css";

const Tutorials = () => {
    const [selectedOption, setSelectedOption] = useState("References");
    
    const content = {
        "References": [
            { id: 1, type: "video", url: "https://www.youtube.com/embed/0lN76aHmay0", description: "Introduction to the topic" },
            { id: 2, type: "video", url: "https://www.youtube.com/embed/9eE7yFxKkyM", description: "Deep dive into key concepts" },
            { id: 3, type: "video", url: "https://www.youtube.com/embed/-_VhU5rqyko", description: "Understanding practical applications" },
            { id: 4, type: "video", url: "https://www.youtube.com/embed/inEPlZZ_SfA", description: "Expert insights on the topic" },
            { id: 5, type: "video", url: "https://www.youtube.com/embed/W_Pk6VasnAA", description: "Common mistakes and how to avoid them" },
            { id: 6, type: "video", url: "https://www.youtube.com/embed/Wa4f7f5y7uQ", description: "Advanced techniques and strategies" }
        ],
        "Tips": [
            { id: 1, type: "image", url: "https://www.uaepersonaltrainers.com/wp-content/uploads/2022/07/6-simple-fitness-tips-you-should-follow-daily-in-the-UAE.jpg", description: "6 simple fitness tips" },
            { id: 2, type: "image", url: "https://i.pinimg.com/736x/64/48/28/644828307fb5109fa68d3d78b1638903.jpg", description: "Healthy habits for daily life" },
            { id: 3, type: "image", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3SDvtlMx5JwiaFkomFUjPLJNErmxeTP-vNA&s", description: "Important wellness tips" },
            { id: 4, type: "image", url: "https://www.ucc.ie/en/media/currentstudents/keepwell/GraduateAttributesInfographicKeepwell-NutritionA1Poster-677x959.jpg", description: "Nutritional guidance for a healthy lifestyle" },
            { id: 5, type: "image", url: "https://images.squarespace-cdn.com/content/v1/5619677ce4b0fcd88ca06589/0030c0b6-7a54-482e-b1a0-74a5a5bc425f/How-to-make-time-for-your-health-fitness.png", description: "Make time for your health and fitness with simple and effective strategies" },
            { id: 6, type: "image", url: "https://www.uaepersonaltrainers.com/wp-content/uploads/2022/11/Fitness-Tips-To-Boost-Your-Health-In-The-UAE.jpg", description: "Boost your health with essential fitness tips" }
        ],
        "Side Effects": [
            { id: 1, type: "image", url: "https://diamondrehabthailand.com/wp-content/uploads/2024/06/What-are-the-negative-effects-of-exercise-addiction-1024x726.png", description: "Common side effects of excess gym" },
            { id: 2, type: "image", url: "https://www.artofliving.org/sites/www.artofliving.org/files/styles/original_image/public/wysiwyg_imageupload/Side-Effects-of-FAD-Diet%20infographic.jpg?itok=nNjnK6rz", description: "Dangers of fad diets" },
            { id: 3, type: "image", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr7E63BRDnZWl88T55WEdgeDZDHXkXA82XmtEvpdWju1H90tnyarNH3aZpMyswmdubH3U&usqp=CAU", description: "Effects of poor nutrition" },
            { id: 4, type: "video", url: "https://www.youtube.com/embed/inEPlZZ_SfA", description: "Expert insights on the topic" },
            { id: 5, type: "video", url: "https://www.youtube.com/embed/W_Pk6VasnAA", description: "Common mistakes and how to avoid them" },
            { id: 6, type: "video", url: "https://www.youtube.com/embed/Wa4f7f5y7uQ", description: "Advanced techniques and strategies" }
        ]
    };

    return (
        <div className="tutorial-container">
            <h1 className='tutorial-head'>Learn More</h1>
            <select 
                className="dropdown" 
                value={selectedOption} 
                onChange={(e) => setSelectedOption(e.target.value)}
            >
                <option>References</option>
                <option>Tips</option>
                <option>Side Effects</option>
            </select>
            <div className="content-grid">
                {content[selectedOption].map((item, index) => (
                    <div key={item.id} className="content-card">
                        {item.type === "video" ? (
                            <iframe
                                width="100%"
                                height="200"
                                src={item.url}
                                title="Video Content"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img src={item.url} alt="Content" className="content-image" />
                        )}
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tutorials;
