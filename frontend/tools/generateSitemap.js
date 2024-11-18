import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseUrl = "https://inclus.de";

const dataFile = `${__dirname}/../public/data/cache-munich.json`;
const rawData = fs.readFileSync(dataFile);
const jsonData = JSON.parse(rawData);

const routes = jsonData.map((item) => ({
	loc: `${baseUrl}/wc/${item.id}`,
	lastmod: item.modified,
	changefreq: "monthly",
	priority: 0.8,
}));

function convertDateFormat(dateStr) {
	const [day, month, year] = dateStr.split("-");
	return `${year}-${month}-${day}`;
}

routes.push(
	{ loc: `${baseUrl}/`, changefreq: "monthly", priority: 1.0 },
	{ loc: `${baseUrl}/imprint`, changefreq: "monthly", priority: 0.5 }
);

const sitemapPath = path.join(__dirname, "..", "public", "sitemap.xml");
const sitemapHeader =
	"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
const sitemapFooter = "</urlset>";
const sitemapContent = routes
	.map((route) => {
		return `<url>
<loc>${route.loc}</loc>
${route.lastmod ? `<lastmod>${convertDateFormat(route.lastmod)}</lastmod>` : ""}
<changefreq>${route.changefreq}</changefreq>
<priority>${route.priority}</priority>
</url>`;
	})
	.join("\n");

const sitemapXml = sitemapHeader + sitemapContent + sitemapFooter;
fs.writeFileSync(sitemapPath, sitemapXml);

console.log("Sitemap.xml has been updated\n");
