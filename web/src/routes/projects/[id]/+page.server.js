import { error } from "@sveltejs/kit";

export const load = ({ locals, params }) => {
  const getProject = async (id) => {
    try {
      const project = structuredClone(
        await locals.pb.collection("projects").getOne(id)
      );
      project.host = locals.user.host;
      return project;
    } catch (err) {
      console.log(err);
      throw error(err.status, err.message);
    }
  };

  return {
    project: getProject(params.id),
  };
};
