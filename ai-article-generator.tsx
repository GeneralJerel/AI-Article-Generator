import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Sparkles, Github, Key } from 'lucide-react';

const ArticleGenerator = () => {
  const [topic, setTopic] = useState('');
  const [length, setLength] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [article, setArticle] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePrompt = (topic, length) => {
    const lengths = {
      short: 300,
      medium: 600,
      long: 1200
    };
    
    return `Write an informative article about ${topic}. 
    Keep it around ${lengths[length]} words. 
    Use a clear, engaging style with proper structure and paragraphs.`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKey || !topic || !length) return;
    
    setLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{
            role: "user",
            content: generatePrompt(topic, length)
          }],
          temperature: 0.7
        })
      });

      const data = await response.json();
      setArticle(data.choices[0].message.content);
    } catch (error) {
      setArticle("Error generating article. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-8 bg-white/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-600" />
              <CardTitle>12 Apps of Christmas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5" />
                <span className="font-medium">Jerel John Velarde</span>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-slate-700">An ambitious project exploring AI's potential in rapid product development. Building 12 applications in 20 days, each pushing the boundaries of AI integration in modern web development. From content generation to data analysis, each app demonstrates practical AI implementation in real-world scenarios.</p>
                
                <div className="flex gap-4 mt-4 flex-wrap">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    AI-Powered
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Rapid Development
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    Full Stack
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <CardTitle>AI Article Generator</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="apiKey" className="flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  OpenAI API Key
                </Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="mt-1 font-mono"
                />
              </div>

              <div>
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter article topic"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="length">Essay Length</Label>
                <Select value={length} onValueChange={setLength}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short Essay</SelectItem>
                    <SelectItem value="medium">Medium Essay</SelectItem>
                    <SelectItem value="long">Long Essay</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                disabled={loading || !apiKey || !topic || !length}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'Generating...' : 'Generate Article'}
              </Button>
            </form>

            {article && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Generated Article:</h3>
                <div className="prose max-w-none whitespace-pre-wrap">
                  {article}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArticleGenerator;
