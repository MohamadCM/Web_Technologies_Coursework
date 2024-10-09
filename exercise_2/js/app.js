function sectionSelect(title) {
  const sectionTitleToShow = document.getElementById(title + '-title')
  const sectionToShow = document.getElementById(title);
  const sectionsToHide = document.querySelectorAll('section');
  const sectionTitlesToHide = document.querySelectorAll('a')

  for (let i = 0; i < sectionsToHide.length; i++) {
    sectionsToHide[i].style.display = 'none';
    sectionTitlesToHide[i].classList.remove('active');
  }

  if (sectionToShow) {
    sectionToShow.style.display = 'flex';
    sectionTitleToShow?.classList.add('active');
  }
}


