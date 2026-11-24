import galleries from "@/data/galleries";
import galleryItems from "@/data/galleryItems";
import media from "@/data/media";
import users from "@/data/users";
import { nameToSlug } from "@/lib/articleHelpers";

function getPhotos(galleryId) {
  return galleryItems
    .filter((item) => item.galleryId === galleryId)
    .sort((a, b) => a.position - b.position)
    .map((item) => {
      const photo = media.find((entry) => entry.id === item.mediaId);
      const photographer = users.find((user) => user.id === photo.uploadedById);
      return { ...photo, position: item.position, photographer: photographer ? photographer.name : null };
    });
}

function withPhotos(gallery) {
  const photos = getPhotos(gallery.id);
  return { ...gallery, slug: nameToSlug(gallery.title), photos, cover: photos[0] };
}

function getSortedGalleries() {
  return [...galleries].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(withPhotos);
}

export async function getAllGalleries() {
  return getSortedGalleries();
}

export async function getGallerySlugs() {
  return galleries.map((gallery) => nameToSlug(gallery.title));
}

export async function getGalleryBySlug(slug) {
  return getSortedGalleries().find((gallery) => gallery.slug === slug) || null;
}

export async function getOtherGalleries(galleryId, limit = 3) {
  return getSortedGalleries()
    .filter((gallery) => gallery.id !== galleryId)
    .slice(0, limit);
}
