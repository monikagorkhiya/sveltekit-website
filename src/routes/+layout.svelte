<script>
	import Header from "$lib/components/Header.svelte";

	import Footer from "$lib/components/Footer.svelte";
	import "../app.css";


</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<meta name="generator" content="Improwised" />
	<title>Improwised Technology</title>
	<link rel="canonical" href="/" />
	<meta name="description" content="" />
	<meta name="robots" content="index, follow" />
	<meta property="og:title" content="" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/opengraph.jpg" />
	<meta property="og:url" content="/" />
	<meta property="og:image:url" content="/opengraph.jpg" />
	<meta property="og:image:alt" content="" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@improwised" />
	<meta
		name="twitter:creator"
		content="@improwised"
	/>

	<link href="/css/style.css" rel="stylesheet" type="text/css" />
	<!-- <link href="/css/style1.css" rel="stylesheet" type="text/css" /> -->



</svelte:head>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<Footer />
	<script src="/js/custom.js"></script>
</div>
