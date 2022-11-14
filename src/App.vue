<template>
  <div id="app">
    <header id="header"></header>
    <router-view/>
  </div>
</template>

<style lang="scss">
body,html{
  background-color: #f9f9f9;
}
*{
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
  background-color: #f9f9f9;
}
#header {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000;
  width: 100vw;
  height: 50px;
}
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section, main {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

// ========================
// common layout
// ========================

* {
	box-sizing: border-box;
}

html,
body {
	-webkit-text-size-adjust: 100%;
	font-size: 10px;
	line-height: 1.0;
	word-wrap: break-word;
	overflow-wrap: break-word;
}

a {
	text-decoration: none;
	color: inherit;
}

img {
	vertical-align: top;
	user-select: none;
	-webkit-touch-callout: none;
}

input,
button,
textarea,
select {
	appearance: none;
	background: none;
	border: none;
	margin: 0;
	padding: 0;
	vertical-align: top;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

input[type=number] {
	-moz-appearance: textfield;
}

input[type=submit],
button {
	cursor: pointer;

	&:focus {
		outline: none;
	}
}

select {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
}

select::-ms-expand {
	display: none;
}

:focus {
	outline: none;
}
</style>
