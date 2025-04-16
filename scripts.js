const resources = [{
		name: "LA Regional Food Bank",
		type: "Food",
		location: "Los Angeles",
		hours: "Sat-Sun: 9am - 5pm",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlvfvIz2mzcXM5nVEfyT6dn3svAI-xKi2MC3or0u16EQqJ-lmR2PVf78L3y5McLtZg8MQ&usqp=CAU",
		url: "https://www.lafoodbank.org/find-food/pantry-locator/"
	},
	{
		name: "The Shower of Hope",
		type: "Shower",
		location: "Los Angeles",
		hours: "Mon-thu: 9am - 3pm",
		image: "https://pics.paypal.com/00/s/MDIyM2YyN2UtNmM0Zi00ZDc0LWE4ZGMtNTlhNjk1YmNlZjBi/file.PNG",
		url: "https://www.theshowerofhope.org/locations"
	},
	{
		name: "Los Angeles Homeless Services Authority",
		type: "Shelter",
		location: "Los Angeles",
		hours: "Mon-Sun: 12pm - 12am",
		image: "https://lancasterconnect.com/wp-content/uploads/2021/11/LAHSA.jpg",
		url: "https://www.lahsa.org/portal/apps/find-a-shelter/map"
	},
	{
		name: "Union Rescue Mission",
		type: "Church",
		location: "Los Angeles",
		hours: "Mon-Sun: 12pm - 12am",
		image: "https://urm.org/wp-content/themes/urm/images/logo-white.png",
		url: "https://urm.org/"
	},
	{
		name: "Los Angeles Mission",
		type: "Church",
		location: "Los Angeles",
		hours: "Mon-Sun: 8am - 4:30pm",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKoSBdaI9tmNfZz8SEE-BnnS9iyf2lQs-1Adh1G5_2J8MvjnccSDAtH13njAY3Fynst14&usqp=CAU",
		url: "https://losangelesmission.org/"
	},
	{
		name: "San Fernando Valley Rescue Mission",
		type: "Shelter",
		location: "Northridge",
		hours: "Mon - Fri: 8:30am - 5pm",
		image: "https://www.erescuemission.org/wp-content/uploads/sites/12/2020/05/RMA-Logo-mobile162.png",
		url: "https://locator.lacounty.gov/lac/Location/3175794/san-fernando-valley-rescue-mission"
	},
];

const searchInput = document.getElementById("search");
const filterType = document.getElementById("filter-type");

function filterResources() {
	const searchTerm = searchInput.value.toLowerCase();
	const selectedType = filterType.value;

	const filtered = resources.filter(resource => {
		const matchesType = selectedType === "all" || resource.type.toLowerCase() === selectedType.toLowerCase();
		const matchesSearch = resource.name.toLowerCase().includes(searchTerm) || resource.location.toLowerCase().includes(searchTerm);
		return matchesType && matchesSearch;
	});

	displayCatalog(filtered);
}

searchInput.addEventListener("input", filterResources);
filterType.addEventListener("change", filterResources);

function displayCatalog(items) {
	const container = document.getElementById("catalog");
	container.innerHTML = "";
	items.forEach((item, index) => {
		const card = document.createElement("div");
		card.className = "card";
		card.innerHTML = `
		<h2>${item.name}</h2>
		<p><strong>Type:</strong> ${item.type}</p>
		<p><strong>Location:</strong> ${item.location}</p>
		<a href="${item.url}" target="_blank">Visit Website</a>`;

		card.addEventListener("click", (e) => {
			if (e.target.tagName === "A") return;
			openModal(item);
		});

		container.appendChild(card);
	});
}

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalLocation = document.getElementById("modal-location");
const modalHours = document.getElementById("modal-hours");
const modalImage = document.getElementById("modal-image");
const closeButton = document.querySelector(".close-button");

function openModal(item) {
	modalTitle.textContent = item.name;
	modalLocation.textContent = item.location;
	modalHours.textContent = item.hours;
	modalImage.src = item.image;
	modal.style.display = "block";
}

closeButton.addEventListener("click", () => {
	modal.style.display = "none";
});

window.addEventListener("click", (event) => {
	if (event.target === modal) {
		modal.style.display = "none";
	}
});

displayCatalog(resources);

const donationLinks = {
	"donate-food": "https://secure.lafoodbank.org/site/Donation2?df_id=2541&mfc_pref=T&2541.donation=form1",
	"donate-shower": "https://www.theshowerofhope.org/donate",
	"donate-shelter": "https://sfvrescuemission.org/donate/"
};

Object.entries(donationLinks).forEach(([id, url]) => {
const btn = document.getElementById(id);
	if (btn) {
		btn.addEventListener("click", (event) => {
			event.preventDefault();
			window.open(url, "_blank");
		});
	}
});
const veteranLinks = {
	"veteran-va": "https://www.va.gov/homeless/",
	"veteran-hvh": "https://www.va.gov/homeless/nchav/index.asp",
	"veteran-usvets": "https://usvets.org/"
};

Object.entries(veteranLinks).forEach(([id, url]) => {
const btn = document.getElementById(id);
	if (btn) {
		btn.addEventListener("click", (event) => {
			event.preventDefault();
			window.open(url, "_blank");
		});
	}
});