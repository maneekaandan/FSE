using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NBench;
using System.Net;
using System.Net.Http.Headers;
using System.IO;
using System.Net.Http;

namespace PerformanceTest
{
    public class Parenttask
    {
        public int parentid { get; set; }
        public string parenttaskdesc { get; set; }
    }

    public class ProjectMgrPerformanceTest
    {
        HttpClient cons = new HttpClient();
        ~ProjectMgrPerformanceTest()
        {
            cons.Dispose();
        }

#region ParentTask
        static async Task GetParentTask(HttpClient cons)
        {
            using (cons)
            {
                cons.BaseAddress = new Uri("http://localhost:63825/api/");
                cons.DefaultRequestHeaders.Accept.Clear();
                cons.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage res = await cons.GetAsync("parenttask");
                res.EnsureSuccessStatusCode();
                if (res.IsSuccessStatusCode)
                {
                    Parenttask[] obj = await res.Content.ReadAsAsync<Parenttask[]>();
                    Console.WriteLine("----------------------------GetParentTask-------------------------");
                    Console.WriteLine("{0}\t{1}\n", obj[0].parentid.ToString(), obj[0].parenttaskdesc);

                }
                else
                {
                    Console.WriteLine("\nError in GetParentTask Operation\n");
                }
            }
        }

#endregion

        public class PerfTesting
        {
            [PerfBenchmark(NumberOfIterations = 500,
                RunMode = RunMode.Throughput,
                TestMode = TestMode.Test,
                SkipWarmups = true)]
            [ElapsedTimeAssertion(MaxTimeMilliseconds = 600000)]
            public void Add_Benchmark_Performance()
            {
                ProjectMgrPerformanceTest pt = new ProjectMgrPerformanceTest();
                GetParentTask(pt.cons).Wait();
            }

        }
    }
}
