// import {
//   searchImages,
//   searchVideos,
//   getImageDetails,
//   getPopularImages,
//   getPopularVideos,
//   getRandomImages,
//   getRandomVideos,
//   getImagesByColor,
//   getVideosByColor,
// } from './apiPixabay.js';

// async function testSearchImages() {
//   try {
//     const images = await searchImages('nature');
//     console.log('Search Images Result:', images);
//   } catch (error) {
//     console.error('Error fetching search images:', error);
//   }
// }

// async function testSearchVideos() {
//   try {
//     const videos = await searchVideos('nature');
//     console.log('Search Videos Result:', videos);
//   } catch (error) {
//     console.error('Error fetching search videos:', error);
//   }
// }

// async function testGetImageDetails() {
//   try {
//     const imageId = '736885'; // ID valid de imagine
//     const imageDetails = await getImageDetails(imageId);
//     console.log('Image Details Result:', imageDetails);
//   } catch (error) {
//     console.error('Error fetching image details:', error);
//   }
// }

// async function testGetPopularImages() {
//   try {
//     const images = await getPopularImages();
//     console.log('Popular Images Result:', images);
//   } catch (error) {
//     console.error('Error fetching popular images:', error);
//   }
// }

// async function testGetPopularVideos() {
//   try {
//     const videos = await getPopularVideos();
//     console.log('Popular Videos Result:', videos);
//   } catch (error) {
//     console.error('Error fetching popular videos:', error);
//   }
// }

// async function testGetRandomImages() {
//   try {
//     const images = await getRandomImages('nature');
//     console.log('Random Images Result:', images);
//   } catch (error) {
//     console.error('Error fetching random images:', error);
//   }
// }

// async function testGetRandomVideos() {
//   try {
//     const videos = await getRandomVideos();
//     console.log('Random Videos Result:', videos);
//   } catch (error) {
//     console.error('Error fetching random videos:', error);
//   }
// }

// async function testGetImagesByColor() {
//   try {
//     const images = await getImagesByColor('red');
//     console.log('Images by Color Result:', images);
//   } catch (error) {
//     console.error('Error fetching images by color:', error);
//   }
// }

// async function testGetVideosByColor() {
//   try {
//     const videos = await getVideosByColor('red');
//     console.log('Videos by Color Result:', videos);
//   } catch (error) {
//     console.error('Error fetching videos by color:', error);
//   }
// }

// // Testarea tuturor funcțiilor
// async function testAllFunctions() {
//   await testSearchImages();
//   await testSearchVideos();
//   await testGetImageDetails();

//   await testGetPopularImages();
//   await testGetPopularVideos();
//   await testGetRandomImages();
//   await testGetRandomVideos();
//   await testGetImagesByColor();
//   await testGetVideosByColor();
// }

// // Apelează funcția pentru a testa toate funcțiile
// testAllFunctions();
