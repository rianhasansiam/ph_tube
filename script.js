const statusC = document.getElementById("statusC");
const catago = document.getElementById("catago");
const videoScetion = document.getElementById("videoScetion");

// Time Conversition

const timeCheck = (time) => {
  const day = parseInt(time / 86400);
  const remainghr = time % 86400;
  const hour = parseInt(remainghr / 3600);
  const remaingmin = remainghr % 3600;
  const min = parseInt(remaingmin / 60);

  return `${day}D ${hour}H ${min}M `;
};

const statusOption = async () => {
  const resposne = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/categories"
  );

  const data = await resposne.json();
  categoriesDisplay(data);
};
statusOption();

const categoriesDisplay = (data) => {
  data.categories.forEach((index) => {
    const h1 = document.createElement("h1");
    const catagoryName = index.category;
    h1.innerText = catagoryName;
    h1.classList =
      "bg-gray-300   text-center font-semibold px-5 py-2 rounded-lg";
    catago.append(h1);
  });
};

// video section api
const videoApi = async () => {
  const resposne = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/videos"
  );
  const data = await resposne.json();
  videoAdd(data);
};
videoApi();

const videoAdd = (data) => {
  // console.log(data.videos)
  data.videos.forEach((index) => {
    const thamble = index.thumbnail;
    const dp = index.authors[0].profile_picture;
    const channelName = index.authors[0].profile_name;
    const title = index.title;
    const veiws = index.others.views;
    const verified = index.authors[0].verified;
    const agotime = index.others.posted_date;

    const div = document.createElement("div");
    div.classList =
      "card card-compact bg-base-100 w-[24%] shadow-xl overflow-hidden";
    div.innerHTML = `<div class="h-[230px] relative">
                  <img class="w-full h-full object-cover "
                    src="${thamble}"
                    alt="" />

                    <span class="absolute bottom-3 right-2 bg-black text-white px-2 text-sm rounded-md">${
                      agotime === "" ? "" : timeCheck(agotime)
                    }</span>
                </div>


                <div class="flex py-4 px-4  gap-5">
                <div class="w-10 h-10 rounded-full overflow-hidden">
                <img class="w-full h-full object-cover "
                   src="${dp}"
                   alt="" />
                </div>

                    <div class="">
                      <h1 class="font-bold text-xl">${title}</h1>
    
                      <div class="flex items-center gap-2">
                      <h3 class="text-lg ">${channelName}</h3>
                       ${
                         verified === true
                           ? '<img class="w-[23px] h-[23px]" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" alt="">'
                           : ""
                       }
    
                      </div>
                </div>
                  
                </div>`;
    // console.log(veiws)

    videoScetion.append(div);
  });
};
