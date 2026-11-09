// src/pages/Skills.jsx
import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useProjects from "../hooks/useProjects";
import { createProject, deleteProject, updateProject } from "../api/projects";
import { updateProfile } from "../api/profile";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import MajorProject from "../components/portfolio/MajorProject";
import ProjectCarousel from "../components/portfolio/ProjectCarousel";
import SkillsMatrix from "../components/portfolio/SkillsMatrix";
import DeveloperLinks from "../components/portfolio/DeveloperLinks";
import ProjectModal from "../components/portfolio/ProjectModal";
import SkillsEditor from "../components/portfolio/SkillsEditor";

function Skills() {
  const { user, setUser } = useAuth();
  const { projects, isLoading, error, refetch } = useProjects();

  // { project: null } = add mode, { project } = edit mode, null = closed.
  const [modal, setModal] = useState(null);
  const [editingSkills, setEditingSkills] = useState(false);

  // The list arrives featured-first, so the first featured project is the hero.
  const major = projects.find((project) => project.isFeatured) ?? null;
  const others = projects.filter((project) => project._id !== major?._id);

  const openAdd = () => setModal({ project: null });
  const openEdit = (project) => setModal({ project });
  const closeModal = () => setModal(null);

  const handleSubmit = async (payload) => {
    if (modal.project) await updateProject(modal.project._id, payload);
    else await createProject(payload);

    closeModal();
    await refetch();
  };

  const handleDelete = async (project) => {
    await deleteProject(project._id);

    closeModal();
    await refetch();
  };

  const handleSaveSkills = async (skills) => {
    const res = await updateProfile({ skills });
    setUser(res.user);
    setEditingSkills(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Portfolio & Skills</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Your projects, skills and developer links in one place.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setEditingSkills(true)}>
            <Pencil size={16} />
            Edit skills
          </Button>
          <Button onClick={openAdd}>
            <Plus size={16} />
            Add project
          </Button>
        </div>
      </div>

      {error && (
        <Card className="flex items-center justify-between gap-4 p-5">
          <p className="text-sm text-status-rejected">{error}</p>
          <Button variant="secondary" size="sm" onClick={refetch}>
            Retry
          </Button>
        </Card>
      )}

      <MajorProject
        project={major}
        isLoading={isLoading}
        onAdd={openAdd}
        onEdit={openEdit}
      />

      {(isLoading || others.length > 0) && (
        <ProjectCarousel
          projects={others}
          isLoading={isLoading}
          onAdd={openAdd}
          onEdit={openEdit}
        />
      )}

      <SkillsMatrix skills={user?.profile?.skills ?? []} />

      <DeveloperLinks links={user?.profile?.links} />

      <ProjectModal
        open={Boolean(modal)}
        project={modal?.project ?? null}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />

      <SkillsEditor
        open={editingSkills}
        skills={user?.profile?.skills ?? []}
        onClose={() => setEditingSkills(false)}
        onSave={handleSaveSkills}
      />
    </div>
  );
}

export default Skills;