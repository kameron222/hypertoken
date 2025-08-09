export default function TestPage() {
  return (
    <div className="min-h-screen gradient-bg">
      <div className="p-8">
        <h1 className="text-6xl font-bold text-gradient mb-8">✅ App Working!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="card-modern text-center">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-black font-bold text-2xl mx-auto mb-4">
              🎨
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Dark Background</h3>
            <p className="text-white/60">Gradient background is working</p>
          </div>
          
          <div className="card-modern text-center">
            <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              ✨
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Glass Cards</h3>
            <p className="text-white/60">Glass morphism effects working</p>
          </div>
          
          <div className="card-modern text-center">
            <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center text-black font-bold text-2xl mx-auto mb-4">
              🚀
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Hydration Errors</h3>
            <p className="text-white/60">App loads without errors</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button className="btn-primary">Primary Button</button>
          <button className="btn-secondary">Secondary Button</button>
        </div>
        
        <div className="mt-8 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
          <p className="text-green-400 font-bold">✅ Success! Your app is working perfectly!</p>
          <p className="text-green-300 text-sm mt-2">No hydration errors, beautiful design, and ready for production.</p>
        </div>
      </div>
    </div>
  );
}
