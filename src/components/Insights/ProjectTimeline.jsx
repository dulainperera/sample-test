import React from 'react';
import { Clock, Home, Building2, Construction, CheckCircle2 } from 'lucide-react';

const ProjectTimeline = () => {
  const timelineData = [
    {
      type: 'Residential',
      icon: <Home className="w-6 h-6" />,
      totalDuration: '11-16 months',
      phases: [
        { name: 'Planning & Approval', duration: '2-3 months', progress: 100 },
        { name: 'Foundation', duration: '1-2 months', progress: 75 },
        { name: 'Construction', duration: '6-8 months', progress: 30 },
        { name: 'Finishing', duration: '2-3 months', progress: 0 }
      ]
    },
    {
      type: 'Commercial',
      icon: <Building2 className="w-6 h-6" />,
      totalDuration: '16-23 months',
      phases: [
        { name: 'Planning & Approval', duration: '3-4 months', progress: 100 },
        { name: 'Foundation', duration: '2-3 months', progress: 80 },
        { name: 'Construction', duration: '8-12 months', progress: 45 },
        { name: 'Finishing', duration: '3-4 months', progress: 0 }
      ]
    }
  ];

  const getProgressColor = (progress) => {
    if (progress === 100) return 'bg-green-500';
    if (progress > 50) return 'bg-yellow-500';
    if (progress > 0) return 'bg-amber-500';
    return 'bg-gray-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-yellow-500 to-amber-400 p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-full">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Project Timelines</h2>
            <p className="text-white/80 mt-1 text-sm">Estimated duration for different project types</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {timelineData.map((project) => (
          <div key={project.type} className="mb-8 last:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                {project.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{project.type}</h3>
                <p className="text-sm text-gray-500">Total: {project.totalDuration}</p>
              </div>
            </div>

            <div className="space-y-4">
              {project.phases.map((phase, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Construction className={`w-4 h-4 ${
                        phase.progress === 100 ? 'text-green-500' : 'text-gray-400'
                      }`} />
                      <span className="font-medium text-gray-700">{phase.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{phase.duration}</span>
                  </div>
                  
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getProgressColor(phase.progress)} transition-all duration-500`}
                      style={{ width: `${phase.progress}%` }}
                    />
                  </div>

                  {phase.progress === 100 && (
                    <div className="absolute -right-1 -top-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
              <span>Not Started</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;