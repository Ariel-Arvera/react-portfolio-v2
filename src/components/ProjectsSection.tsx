import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Grid2x2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import backOfficeBiggie from "@/components/webs-portflio/BackOfficeBiggie.jpg";
import cajaAntes from "@/components/webs-portflio/CajaAntes.png";
import cajaCambios from "@/components/webs-portflio/CajaCambios.png";
import cajaDespues from "@/components/webs-portflio/CajaDespues.png";
import cajaFinal from "@/components/webs-portflio/CajaFinal.png";
import listaDeBodas from "@/components/webs-portflio/listaDeBodasNA.jpg";
import sorteoEnamorados from "@/components/webs-portflio/SorteoDiadeLosEnamorados.jpg";
import sorteoPapaMama from "@/components/webs-portflio/SorteoPapa&Mama.jpg";
import { useLanguage } from "@/context/language";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useSound } from "@/hooks/useSound";

type GalleryImage = {
  titleEs: string;
  titleEn: string;
  image: string;
};

type PortfolioProject = {
  titleEs: string;
  titleEn: string;
  categoryEs: string;
  categoryEn: string;
  coverImage: string;
  gallery?: GalleryImage[];
};

const projects: PortfolioProject[] = [
  {
    titleEs: "Back Office Biggie",
    titleEn: "Back Office Biggie",
    categoryEs: "Panel administrativo",
    categoryEn: "Admin dashboard",
    coverImage: backOfficeBiggie,
  },
  {
    titleEs: "Flujo de Caja",
    titleEn: "Checkout Flow",
    categoryEs: "Antes / Cambios / Después / Final",
    categoryEn: "Before / Changes / After / Final",
    coverImage: cajaFinal,
    gallery: [
      { titleEs: "Antes", titleEn: "Before", image: cajaAntes },
      { titleEs: "Cambios", titleEn: "Changes", image: cajaCambios },
      { titleEs: "Después", titleEn: "After", image: cajaDespues },
      { titleEs: "Final", titleEn: "Final", image: cajaFinal },
    ],
  },
  {
    titleEs: "Lista de Bodas",
    titleEn: "Wedding List",
    categoryEs: "Landing comercial",
    categoryEn: "Commercial landing",
    coverImage: listaDeBodas,
  },
  {
    titleEs: "Sorteo Día de los Enamorados",
    titleEn: "Valentine's Day Giveaway",
    categoryEs: "Campaña promocional",
    categoryEn: "Promotional campaign",
    coverImage: sorteoEnamorados,
  },
  {
    titleEs: "Sorteo Papá y Mamá",
    titleEn: "Father's and Mother's Giveaway",
    categoryEs: "Campaña estacional",
    categoryEn: "Seasonal campaign",
    coverImage: sorteoPapaMama,
  },
];

const ProjectsSection = () => {
  const { language } = useLanguage();
  const { playClick } = useSound();
  const { ref, isVisible } = useScrollAnimation();
  const [viewMode, setViewMode] = useState<"carousel" | "thumbs">("carousel");
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [modalGalleryIndex, setModalGalleryIndex] = useState(0);

  const labels =
    language === "es"
      ? {
          title: "Trabajos",
          carousel: "Cartas",
          thumbs: "Miniaturas",
          viewAs: "Ver como",
          prev: "Anterior",
          next: "Siguiente",
          open: "Ver imagen",
          close: "Cerrar",
        }
      : {
          title: "Work",
          carousel: "Cards",
          thumbs: "Thumbnails",
          viewAs: "View as",
          prev: "Previous",
          next: "Next",
          open: "View image",
          close: "Close",
        };

  const modalProject = modalIndex === null ? null : projects[modalIndex];
  const modalGallery = useMemo(() => {
    if (!modalProject) return [];
    if (modalProject.gallery?.length) return modalProject.gallery;
    return [
      {
        titleEs: modalProject.titleEs,
        titleEn: modalProject.titleEn,
        image: modalProject.coverImage,
      },
    ];
  }, [modalProject]);

  const currentModalImage = modalGallery[modalGalleryIndex] ?? null;

  useEffect(() => {
    if (modalIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModalIndex(null);
        return;
      }

      if (!modalGallery.length) return;

      if (event.key === "ArrowLeft") {
        setModalGalleryIndex((current) => (current - 1 + modalGallery.length) % modalGallery.length);
      }

      if (event.key === "ArrowRight") {
        setModalGalleryIndex((current) => (current + 1) % modalGallery.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalIndex, modalGallery.length]);

  const moveCarousel = (direction: "left" | "right") => {
    playClick();
    setActiveIndex((current) => {
      if (direction === "left") {
        return (current - 1 + projects.length) % projects.length;
      }

      return (current + 1) % projects.length;
    });
  };

  const openModal = (index: number) => {
    playClick();
    setModalIndex(index);
    setModalGalleryIndex(0);
  };

  const moveModalGallery = (direction: "left" | "right") => {
    if (modalGallery.length <= 1) return;
    setModalGalleryIndex((current) => {
      if (direction === "left") {
        return (current - 1 + modalGallery.length) % modalGallery.length;
      }
      return (current + 1) % modalGallery.length;
    });
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-8 gradient-text"
        >
          {labels.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{labels.viewAs}</span>
          <button
            type="button"
            onClick={() => setViewMode("carousel")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              viewMode === "carousel"
                ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {labels.carousel}
          </button>
          <button
            type="button"
            onClick={() => setViewMode("thumbs")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              viewMode === "thumbs"
                ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <Grid2x2 className="w-3.5 h-3.5" />
            {labels.thumbs}
          </button>
        </motion.div>

        {viewMode === "carousel" ? (
          <div className="relative mx-auto max-w-5xl px-10 sm:px-14 pb-8">
            <button
              type="button"
              onClick={() => moveCarousel("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-40 h-11 w-11 rounded-full bg-card/90 border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors inline-flex items-center justify-center"
              aria-label={labels.prev}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => moveCarousel("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-40 h-11 w-11 rounded-full bg-card/90 border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors inline-flex items-center justify-center"
              aria-label={labels.next}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="relative h-[480px] sm:h-[500px] md:h-[460px]">
              {[0, 1, 2].map((depth) => {
                const index = (activeIndex + depth) % projects.length;
                const project = projects[index];
                const isFront = depth === 0;
                const title = language === "es" ? project.titleEs : project.titleEn;
                const category = language === "es" ? project.categoryEs : project.categoryEn;

                return (
                  <motion.article
                    key={`${title}-${depth}`}
                    initial={{ opacity: 0, y: 26 }}
                    animate={
                      isVisible
                        ? {
                            opacity: 1 - depth * 0.2,
                            y: depth * 14,
                            scale: 1 - depth * 0.05,
                          }
                        : {}
                    }
                    transition={{ duration: 0.42, ease: "easeOut" }}
                    className={`absolute inset-x-0 mx-auto w-full max-w-3xl glass-card overflow-hidden group border border-transparent hover:border-primary/30 ${
                      isFront ? "hover:box-glow" : "pointer-events-none"
                    }`}
                    style={{ zIndex: 30 - depth }}
                  >
                    <button type="button" onClick={() => openModal(index)} className="block w-full text-left">
                      <div className="relative h-52 md:h-56 overflow-hidden">
                        <img
                          src={project.coverImage}
                          alt={title}
                          className={`w-full h-full object-cover transition-transform duration-700 ${
                            isFront ? "group-hover:scale-105" : ""
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/25 to-transparent" />
                      </div>
                    </button>
                    <div className="p-4 md:p-5">
                      <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{category}</p>
                      <button
                        type="button"
                        onClick={() => openModal(index)}
                        className="text-sm text-primary hover:underline"
                      >
                        {labels.open}
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              {activeIndex + 1} / {projects.length}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {projects.map((project, i) => {
              const title = language === "es" ? project.titleEs : project.titleEn;
              const category = language === "es" ? project.categoryEs : project.categoryEn;

              return (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.04 }}
                  className="glass-card overflow-hidden group hover:box-glow transition-all duration-500 border border-transparent hover:border-primary/30"
                >
                  <button type="button" onClick={() => openModal(i)} className="block w-full text-left">
                    <div className="relative h-32 md:h-36 overflow-hidden">
                      <img
                        src={project.coverImage}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="text-sm md:text-base font-semibold text-foreground line-clamp-2">{title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{category}</p>
                    </div>
                  </button>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {modalProject && currentModalImage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-sm"
            onClick={() => setModalIndex(null)}
          >
            <button
              type="button"
              onClick={() => setModalIndex(null)}
              className="absolute top-5 right-5 h-10 w-10 rounded-full bg-card/90 border border-border/70 text-foreground inline-flex items-center justify-center"
              aria-label={labels.close}
            >
              <X className="w-4 h-4" />
            </button>

            {modalGallery.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    moveModalGallery("left");
                  }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-card/90 border border-border/70 text-foreground inline-flex items-center justify-center"
                  aria-label={labels.prev}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    moveModalGallery("right");
                  }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-card/90 border border-border/70 text-foreground inline-flex items-center justify-center"
                  aria-label={labels.next}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            ) : null}

            <div className="h-full w-full p-6 md:p-12 flex flex-col items-center justify-center gap-5" onClick={(event) => event.stopPropagation()}>
              <motion.img
                key={currentModalImage.image}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                src={currentModalImage.image}
                alt={language === "es" ? currentModalImage.titleEs : currentModalImage.titleEn}
                className="max-h-[72vh] max-w-full object-contain rounded-lg"
              />

              {modalGallery.length > 1 ? (
                <div className="w-full max-w-4xl">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {modalGallery.map((item, index) => {
                      const label = language === "es" ? item.titleEs : item.titleEn;
                      const isActive = index === modalGalleryIndex;
                      return (
                        <button
                          key={`${item.titleEs}-${index}`}
                          type="button"
                          onClick={() => setModalGalleryIndex(index)}
                          className={`rounded-lg border p-2 text-left transition-colors ${
                            isActive
                              ? "border-primary bg-primary/15 text-primary"
                              : "border-border/70 bg-card/60 text-foreground/80 hover:border-primary/40"
                          }`}
                        >
                          <img src={item.image} alt={label} className="h-16 w-full object-cover rounded-md mb-2" />
                          <span className="text-xs font-medium">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
