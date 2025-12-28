import { supabaseServer } from "../supabase/server";


export async function getProjectsWithMedia() {
  const { data, error } = await supabaseServer
    .from("projects")
    .select(`
      id,
      slug,
      title,
      description,
      videos (
        id,
        video_url
      ),
      images (
        id,
        image_url,
        sort_order
      )
    `)
    .order("created_at", { foreignTable: "videos", ascending: false })
    .order("sort_order", { foreignTable: "images", ascending: true });

  if (error) {
    throw error
    // console.log(error)
    return []
  }

  // console.log(data)
  return data || [];
}
