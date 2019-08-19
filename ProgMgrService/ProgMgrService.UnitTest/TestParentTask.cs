using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProgMgrService;
using ProgMgrService.Controllers;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;

namespace ProgMgrService.UnitTest
{
    [TestClass]
    public class TestParentTask
    {
        [TestMethod]
        public void Test_Get_Pos()
        {
            parenttaskController obj = new parenttaskController();
            int actualCount = obj.Get4Testing(0);
            int expectedCount = 6;

            Assert.AreEqual(expectedCount, actualCount);
        }

        [TestMethod]
        public void Test_Get_Neg()
        {
            parenttaskController obj = new parenttaskController();
            int actualCount = obj.Get4Testing(0);
            int expectedCount = 7;
            //Negative Test case
            Assert.AreEqual(expectedCount, actualCount);
        }
    }
    
}
