import electronicItem from "../assets/electronics.png";
import backpackItem from "../assets/bag.png";
import walletItem from "../assets/wallet.png";
import documentItem from "../assets/docs.png";
import keyItem from "../assets/key.png";
import clothingItem from "../assets/clothes.png";
import atmItem from "../assets/atm.png";
import instrumentItem from "../assets/guitar.png";
import sportsItem from "../assets/ball.png";
import toolsItem from "../assets/tools.png";
import personalItem from "../assets/personal.png";
import othersItem from "../assets/others.png";

const categories = [
  { name: "Electronics", icon: electronicItem },
  { name: "Backpacks", icon: backpackItem },
  { name: "Wallets", icon: walletItem },
  { name: "Document", icon: documentItem },
  { name: "Keys", icon: keyItem },
  { name: "Clothing", icon: clothingItem },
  { name: "Atm Cards", icon: atmItem },
  { name: "Instrument", icon: instrumentItem },
  { name: "Sports Equipment", icon: sportsItem },
  { name: "Tools & Utilities", icon: toolsItem },
  { name: "Personal Items", icon: personalItem },
  { name: "Others", icon: othersItem },
];

export default function Filter() {
  return (
      <div className="text-center py-12 bg-white">
      <h2 className="text-3xl font-bold mb-2">Filter lost items</h2>
      <p className="text-gray-600 mb-10 max-w-xl mx-auto">
        Easily narrow down lost items by category, location, or date so you can find what you're looking for, faster.
      </p>
      <div className="grid lg:grid-cols-6 gap-6 px-4 md:px-10">
        {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md  w-[70%] py-9 hover:shadow-lg transition flex flex-col justify-between items-center cursor-pointer"
            >
              <img
                src={cat.icon}
               
                className="w-12 h-12 object-contain"
              />
              <div className="font-semibold text-gray-900">{cat.name}</div>
            </div>
          ))}
        </div>
      
      </div>


  );
}
