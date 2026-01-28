import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import logoWhite from '@/assets/logo-primary-white.svg';
import { Check, X, Trash2, LogOut, MessageSquare, ChefHat, Building2 } from 'lucide-react';
import { RecipeGenerator } from '@/components/admin/RecipeGenerator';
import WholesaleCustomerManager from '@/components/admin/WholesaleCustomerManager';

interface StorySubmission {
  id: string;
  text: string;
  author_name: string;
  author_location: string | null;
  is_approved: boolean;
  created_at: string;
}

const Admin = () => {
  const [stories, setStories] = useState<StorySubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/auth');
      } else if (!isAdmin) {
        toast.error('You do not have admin access');
        navigate('/');
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchStories();
    }
  }, [isAdmin]);

  const fetchStories = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('story_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load stories');
    } else {
      setStories(data || []);
    }
    setIsLoading(false);
  };

  const handleApprove = async (id: string, approve: boolean) => {
    const { error } = await supabase
      .from('story_submissions')
      .update({ is_approved: approve })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update story');
    } else {
      toast.success(approve ? 'Story approved!' : 'Story unapproved');
      fetchStories();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this story?')) return;

    const { error } = await supabase
      .from('story_submissions')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete story');
    } else {
      toast.success('Story deleted');
      fetchStories();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading || !isAdmin) {
    return (
      <div className="min-h-screen bg-forest flex items-center justify-center">
        <div className="text-cream">Loading...</div>
      </div>
    );
  }

  const pendingStories = stories.filter(s => !s.is_approved);
  const approvedStories = stories.filter(s => s.is_approved);

  return (
    <div className="min-h-screen bg-forest">
      {/* Header */}
      <header className="border-b border-cream/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logoWhite} alt="Dry" className="h-8" />
            <span className="font-sans text-sm text-cream/50">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-sans text-sm text-cream/70">{user?.email}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="border-cream/20 text-cream hover:bg-cream/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-gold hover:text-gold/80 hover:bg-transparent -ml-4"
          >
            ← Back to site
          </Button>
        </div>

        <Tabs defaultValue="stories" className="space-y-6">
          <TabsList className="bg-cream/10 border border-cream/20">
            <TabsTrigger 
              value="stories" 
              className="data-[state=active]:bg-cream data-[state=active]:text-forest text-cream"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Stories
            </TabsTrigger>
            <TabsTrigger 
              value="recipes"
              className="data-[state=active]:bg-cream data-[state=active]:text-forest text-cream"
            >
              <ChefHat className="w-4 h-4 mr-2" />
              Recipe Generator
            </TabsTrigger>
            <TabsTrigger 
              value="wholesale"
              className="data-[state=active]:bg-cream data-[state=active]:text-forest text-cream"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Wholesale
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stories">
            <h1 className="font-display text-4xl text-cream mb-8">Story Submissions</h1>

            {isLoading ? (
              <div className="text-cream/70">Loading stories...</div>
            ) : (
              <>
                {/* Pending Stories */}
                <section className="mb-12">
                  <h2 className="font-display text-2xl text-gold mb-4">
                    Pending Review ({pendingStories.length})
                  </h2>
                  {pendingStories.length === 0 ? (
                    <p className="text-cream/50 font-sans">No pending stories</p>
                  ) : (
                    <div className="space-y-4">
                      {pendingStories.map((story) => (
                        <StoryCard
                          key={story.id}
                          story={story}
                          onApprove={() => handleApprove(story.id, true)}
                          onReject={() => handleDelete(story.id)}
                        />
                      ))}
                    </div>
                  )}
                </section>

                {/* Approved Stories */}
                <section>
                  <h2 className="font-display text-2xl text-cream mb-4">
                    Approved ({approvedStories.length})
                  </h2>
                  {approvedStories.length === 0 ? (
                    <p className="text-cream/50 font-sans">No approved stories yet</p>
                  ) : (
                    <div className="space-y-4">
                      {approvedStories.map((story) => (
                        <StoryCard
                          key={story.id}
                          story={story}
                          onUnapprove={() => handleApprove(story.id, false)}
                          onDelete={() => handleDelete(story.id)}
                          isApproved
                        />
                      ))}
                    </div>
                  )}
                </section>
              </>
            )}
          </TabsContent>

          <TabsContent value="recipes">
            <h1 className="font-display text-4xl text-cream mb-8">AI Recipe Generator</h1>
            <RecipeGenerator />
          </TabsContent>

          <TabsContent value="wholesale">
            <div className="bg-cream rounded-lg p-6">
              <WholesaleCustomerManager />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

interface StoryCardProps {
  story: StorySubmission;
  onApprove?: () => void;
  onReject?: () => void;
  onUnapprove?: () => void;
  onDelete?: () => void;
  isApproved?: boolean;
}

const StoryCard = ({ story, onApprove, onReject, onUnapprove, onDelete, isApproved }: StoryCardProps) => {
  const date = new Date(story.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-cream/5 border border-cream/10 rounded-lg p-6">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <p className="font-sans text-cream mb-3 leading-relaxed">"{story.text}"</p>
          <div className="flex items-center gap-4 text-sm text-cream/50 font-sans">
            <span className="font-bold text-cream/70">— {story.author_name}</span>
            {story.author_location && <span>{story.author_location}</span>}
            <span>{date}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isApproved ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onUnapprove}
                className="border-cream/20 text-cream hover:bg-cream/10"
              >
                <X className="w-4 h-4 mr-1" />
                Unapprove
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onDelete}
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                onClick={onApprove}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Check className="w-4 h-4 mr-1" />
                Approve
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onReject}
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
