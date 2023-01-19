

const escapeString = (string) => {
    const symbols = {
        "<":	"&lt",
        ">":	"&gt",
        "&":	"&amp",
    }
    return string.replace(/[&<>]/g, (tag) => {
        return symbols[tag] || tag;
    })
}





const getNews = (async () => {
  const response = await fetch('https://frontend.karpovcourses.net/api/v2/ru/news/')
  const data = await response.json()

  const mainNewsContainer = document.querySelector('.news-list')


  const mainNews = data.items.splice(6, 3)

  mainNews.forEach((item) => {
    const div = document.createElement('div');

    const tag = data.categories.find(category => item.category_id === category.id).name
    const sourceName = data.sources.find(category => item.source_id === category.id).name


div.innerHTML = `<article class="article news-list__article">
    <div class="photo article__photo">
      <img src=${encodeURI(item.image)} width="344px" />
    </div>
    <div class="right article__right">
    <div class="tag">${escapeString(tag)}</div>
    <h2 class="title article__title">${escapeString(item.title)}</h2>
    <div class="text">${escapeString(item.description)}</div>
    <a  href='#' class="source article__source">${escapeString(sourceName)}</a>
  </div>
  </article>`


    mainNewsContainer.appendChild(div);
})

const smallNewsContainer = document.querySelector('.aside')

const smallNews = data.items.splice(6, 6 + 2)
console.log(smallNews)
const convertDate = (date) => {
   return new Date(date).toLocaleDateString('ru-RU', {month: 'long', day: 'numeric'}).toUpperCase();
}

smallNews.forEach((item) => {
    const article = document.createElement('article');

    const sourceName = data.sources.find(category => item.source_id === category.id).name


article.innerHTML = `<article class="sm-article aside__sm-article">
<h5 class="sm-title aside__sm-title" >${escapeString(item.title)}</h5>
<div class="bottom-row">
  <div class="date">${escapeString(convertDate(item.date))}</div>
  <a  href="#" class="source aside__source">· ${escapeString(sourceName)}</a>

</div>

</article>`


smallNewsContainer.appendChild(article);
})


})()