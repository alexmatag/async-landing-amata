const API = 'https://images-api.nasa.gov/search?q=galaxy&media_type=image';

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	}
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

function limitTextLength(text, maxLength) {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

(async () => {
    try {
        const itemsNASA = await fetchData(API);
        //console.log(itemsNASA.collection.items);

        let view = `
            ${itemsNASA.collection.items.map(item => `
                <div class="group relative">
                    <div class="w-full aspect-square bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75">
                        <img 
                            src="${item.links?.[0]?.href}" 
                            alt="${item.data?.[0]?.description || item.data?.[0]?.title}" 
                            class="w-full h-full object-center object-cover" 
                            onerror="this.onerror=null; this.src='./img/space-banner.png';"
                        />
                    </div>
                    <div class="mt-4 flex flex-col justify-between">
                        <h3 class="text-lg font-bold text-slate-200">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            ${item.data?.[0]?.title}
                        </h3>
                        <p class="text-sm block text-slate-200">
                            ${limitTextLength(item.data?.[0]?.description, 120)}
                        </p>
                    </div>
                </div>
            `).slice(0, 8).join('')}
        `;
        content.innerHTML = view;
    } catch (error) {
        console.error(error);
        alert('Failed to fetch news articles. Please try again later.');
    }
})();
