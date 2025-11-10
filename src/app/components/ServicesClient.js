"use client";

function fmt(date) {
  return new Intl.DateTimeFormat("en-GB").format(date);
}

export default function ServicesClient({ services }) {
  if (!services?.length) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400 text-lg">No services found.</p>
      </div>
    );
  }

  // Group services by bike and find latest service + highest odometer
  const bikeServices = services.reduce((acc, service) => {
    const bikeId = service.bike.id;
    const serviceDate = service.serviceDate ? new Date(service.serviceDate) : new Date(service.createdAt);
    const odometer = service.odometerReading || 0;

    if (!acc[bikeId] || serviceDate > acc[bikeId].date) {
      acc[bikeId] = {
        service,
        date: serviceDate,
        maxOdometer: odometer,
      };
    }
    
    // Track highest odometer
    if (odometer > acc[bikeId].maxOdometer) {
      acc[bikeId].maxOdometer = odometer;
    }

    return acc;
  }, {});

  const today = new Date();

  return (
    <div className="min-h-screen bg-black py-22 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-red-600 mb-8 text-center">
          Service Tracker
        </h2>

        <div className="space-y-6">
          {Object.values(bikeServices).map(({ service, date, maxOdometer }) => {
            const nextServiceMin = new Date(date);
            nextServiceMin.setMonth(nextServiceMin.getMonth() + 3);
            
            const nextServiceMax = new Date(date);
            nextServiceMax.setMonth(nextServiceMax.getMonth() + 4);

            const odometerMin = maxOdometer + 3000;
            const odometerMax = maxOdometer + 5000;
            
            const isOverdue = today > nextServiceMax;

            return (
              <div
                key={service.id}
                className={`bg-gradient-to-br ${
                  isOverdue 
                    ? "from-red-900 to-red-950 border-red-600" 
                    : "from-gray-900 to-black border-gray-800"
                } border-2 rounded-2xl p-6 shadow-2xl transition-all hover:scale-[1.02]`}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {service.bike.brand} {service.bike.model}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {service.bike.registrationNo}
                    </p>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full font-semibold text-sm ${
                      isOverdue
                        ? "bg-red-600 text-white animate-pulse"
                        : "bg-gray-800 text-green-400 border border-green-400"
                    }`}
                  >
                    {isOverdue ? "🚨 OVERDUE" : "✓ On Track"}
                  </span>
                </div>

                {/* Current Status */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-black bg-opacity-50 rounded-lg p-3 border border-gray-800">
                    <p className="text-gray-500 text-xs uppercase mb-1">Last Service</p>
                    <p className="text-white font-semibold">{fmt(date)}</p>
                  </div>
                  <div className="bg-black bg-opacity-50 rounded-lg p-3 border border-gray-800">
                    <p className="text-gray-500 text-xs uppercase mb-1">Current Odometer</p>
                    <p className="text-white font-semibold">{maxOdometer.toLocaleString()} km</p>
                  </div>
                </div>

                {/* Next Service Info */}
                <div className={`rounded-xl p-4 border-2 ${
                  isOverdue ? "bg-red-950 bg-opacity-30 border-red-600" : "bg-gray-900 border-red-600"
                }`}>
                  <p className="text-red-400 font-bold mb-3 flex items-center gap-2">
                    <span className="text-xl">🔧</span>
                    Next Service Due
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Date Range:</span>
                      <span className="text-white font-medium">
                        {fmt(nextServiceMin)} – {fmt(nextServiceMax)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Odometer:</span>
                      <span className="text-white font-medium">
                        {odometerMin.toLocaleString()} – {odometerMax.toLocaleString()} km
                      </span>
                    </div>
                  </div>
                </div>

                {/* Remarks */}
                {service.remarks && (
                  <p className="mt-4 text-gray-400 text-sm italic">
                    Note: {service.remarks}
                  </p>
                )}

                {/* Overdue Warning */}
                {isOverdue && (
                  <div className="mt-4 bg-red-600 text-white px-4 py-3 rounded-lg font-semibold text-center">
                    ⚠️ Service Overdue! Schedule Immediately
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}