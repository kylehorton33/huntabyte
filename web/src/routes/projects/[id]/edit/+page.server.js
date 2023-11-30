import { error, redirect } from "@sveltejs/kit";

export const load = async ({ locals, params }) => {
  if (!locals.pb.authStore.isValid) {
    throw error(401, "Unauthorized");
  }
  try {
    const project = structuredClone(
      await locals.pb.collection("projects").getOne(params.id)
    );

    if (locals.user.id === project.user) {
      project.host = locals.user.host;
      return {
        project,
      };
    } else {
      throw error(403, "Forbidden");
    }
  } catch (err) {
    console.log(err);
    throw error(err.status, err.message);
  }
};

export const actions = {
  updateProject: async ({ request, locals, params }) => {
    const formData = await request.formData();

    const thumbnail = formData.get("thumbnail");

    if (thumbnail.size === 0) {
      formData.delete("thumbnail");
    }

    try {
      await locals.pb.collection("projects").update(params.id, formData);
    } catch (err) {
      console.log(err);
      throw error(err.status, err.message);
    }

    throw redirect(302, `/projects/${params.id}`);
  },
  deleteThumbnail: async ({ locals, params }) => {
    try {
      await locals.pb
        .collection("projects")
        .update(params.id, { thumbnail: null });
    } catch (err) {
      console.log("Error: ", err);
      throw error(err.status, err.message);
    }
    return {
      success: true,
    };
  },
};
